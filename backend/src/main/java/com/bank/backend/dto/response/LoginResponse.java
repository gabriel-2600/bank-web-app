package com.bank.backend.dto.response;

public record LoginResponse(String accessToken, String refreshToken, Long userId, String username) {
}
