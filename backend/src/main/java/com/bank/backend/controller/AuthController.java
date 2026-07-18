package com.bank.backend.controller;

import com.bank.backend.dto.request.LoginRequest;
import com.bank.backend.dto.request.RegisterRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.dto.response.RefreshTokenResponse;
import com.bank.backend.dto.response.RegisterResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.service.AuthService;
import com.bank.backend.service.RefreshTokenService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        return ResponseEntity.ok().body(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        LoginResponse loginResponse = authService.authenticateUser(loginRequest);
        String refreshToken = refreshTokenService.createRefreshToken(loginResponse.userId());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 1 week
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(loginResponse);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logoutUser(@CookieValue(value = "refreshToken", required = false)String refreshToken){
        if (refreshToken != null) {
            var token = refreshTokenService.findToken(refreshToken);
            refreshTokenService.deleteToken(token);
        }

        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body("Unauthenticated");
    }

    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<?> refreshToken(@CookieValue("refreshToken") String oldRefreshToken){
        var refreshToken = refreshTokenService.findToken(oldRefreshToken);
        refreshTokenService.validateToken(refreshToken);
        Users user = refreshTokenService.findAssociatedUser(refreshToken);

        String newRefreshToken = refreshTokenService.createRefreshToken(user.getUserId());
        String newAccessToken = authService.generateAccessToken(user.getUsername());

        RefreshTokenResponse refreshTokenResponse = new RefreshTokenResponse(newAccessToken);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 1 week
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(refreshTokenResponse);
    }
}
