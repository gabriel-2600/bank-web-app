package com.bank.backend.dto.response;

public record LoginResponse(String accessToken, Long userId, String username) {
}
