package com.bank.backend.service;

import com.bank.backend.dto.request.LoginRequest;
import com.bank.backend.dto.request.RegisterRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.dto.response.RegisterResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.AlreadyExistsException;
import com.bank.backend.repository.UsersRepoInterface;
import com.bank.backend.security.CustomUserDetails;
import com.bank.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    private final UsersRepoInterface usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UsersRepoInterface usersRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil, RefreshTokenService refreshTokenService){
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    public RegisterResponse createUser(RegisterRequest registerRequest){
        if(usersRepository.existsByUsername(registerRequest.username())){
            throw new AlreadyExistsException("Username already exists");
        }

        Users user = new Users();
        user.setFullName(registerRequest.fullName());
        user.setUsername(registerRequest.username());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        usersRepository.save(user);

        return new RegisterResponse("User Created", true);
    }

    public LoginResponse authenticateUser(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )
        );

        final CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String accessToken = generateAccessToken(userDetails.getUsername());
        String refreshToken = refreshTokenService.createRefreshToken(userDetails.getUserId());

        return new LoginResponse(accessToken, refreshToken, userDetails.getUserId(), userDetails.getUsername());
    }

    public String generateAccessToken(String username){
        return jwtUtil.generateToken(username);
    }
}
