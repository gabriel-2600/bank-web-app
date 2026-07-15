package com.bank.backend.controller;

import com.bank.backend.dto.request.LoginRequest;
import com.bank.backend.dto.request.RefreshTokenRequest;
import com.bank.backend.dto.request.RegisterRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.dto.response.RegisterResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.exceptions.TokenInvalidException;
import com.bank.backend.service.AuthService;
import com.bank.backend.service.RefreshTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    public AuthController(AuthService authService, RefreshTokenService refreshTokenService){
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(registerRequest.fullName().isBlank() || registerRequest.username().isBlank() || registerRequest.password().isBlank()){
            throw new InvalidInputException("Invalid Input");
        }

        if(registerRequest.username().length() < 4){
            throw new InvalidInputException("Invalid Input");
        }

        if(registerRequest.password().length() < 8){
            throw new InvalidInputException("Invalid Input");
        }

        RegisterResponse registerResponse = authService.createUser(registerRequest);

        return new ResponseEntity<>(registerResponse, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        LoginResponse loginResponse = authService.authenticateUser(loginRequest);

        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest){
        var refreshToken = refreshTokenService.findToken(refreshTokenRequest);
        boolean isValid = refreshTokenService.isTokenValid(refreshToken);
        if(isValid){
            Users user = refreshTokenService.findAssociatedUser(refreshTokenRequest);
            String accessToken = authService.generateAccessToken(user.getUsername());

            return new ResponseEntity<>(accessToken, HttpStatus.OK);
        }

        throw new TokenInvalidException("Unauthorized");
    }
}
