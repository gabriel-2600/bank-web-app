package com.bank.backend.dto.response;

public record LoginResponse(String token, Long userId, String username) {
}
