package com.bank.backend.service;

import com.bank.backend.dto.request.RefreshTokenRequest;
import com.bank.backend.entity.RefreshToken;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.TokenInvalidException;
import com.bank.backend.exceptions.UserNotFoundException;
import com.bank.backend.repository.RefreshTokenRepoInterface;
import com.bank.backend.repository.UsersRepoInterface;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService  {
    private final RefreshTokenRepoInterface refreshTokenRepoInterface;
    private final UsersRepoInterface usersRepoInterface;

    public RefreshTokenService(
            RefreshTokenRepoInterface refreshTokenRepoInterface,
            UsersRepoInterface usersRepoInterface
            ){
        this.refreshTokenRepoInterface = refreshTokenRepoInterface;
        this.usersRepoInterface = usersRepoInterface;
    }

    @Transactional
    public String createRefreshToken(Long userId){
        Optional<RefreshToken> oldRefreshToken = findTokenByUserId(userId);
        oldRefreshToken.ifPresent(this::deleteToken);

        String stringUUID = UUID.randomUUID().toString();
        var expiryDate = LocalDateTime.now().plusWeeks(1);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(stringUUID);
        refreshToken.setExpiryDate(expiryDate);
        refreshToken.setUserId(userId);
        refreshTokenRepoInterface.save(refreshToken);

        return refreshToken.getToken();
    }

    public RefreshToken findToken(RefreshTokenRequest refreshTokenRequest){
        return refreshTokenRepoInterface.findByToken(refreshTokenRequest.refreshToken()).orElseThrow((() -> new TokenInvalidException("Unauthorized")));
    }

    public Optional<RefreshToken> findTokenByUserId(Long userId){
        return refreshTokenRepoInterface.findByUserId(userId);
    }

    public boolean isTokenValid(RefreshToken refreshToken){
        var refreshTokenExpiryDate = refreshToken.getExpiryDate();
        var currentDate = LocalDateTime.now();
        boolean isExpired = currentDate.isAfter(refreshTokenExpiryDate);

        if(isExpired){
            deleteToken(refreshToken);
            return false;
        }

        return true;
    }

    public Users findAssociatedUser(RefreshTokenRequest refreshTokenRequest){
        var refreshToken = findToken(refreshTokenRequest);
        return usersRepoInterface.findById(refreshToken.getUserId()).orElseThrow(() -> new UserNotFoundException("User Not Found"));
    }

    public void deleteToken(RefreshToken refreshToken){
        refreshTokenRepoInterface.delete(refreshToken);
    }
}
