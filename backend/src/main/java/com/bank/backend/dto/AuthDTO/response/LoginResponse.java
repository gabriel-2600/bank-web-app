package com.bank.backend.dto.AuthDTO.response;

public record LoginResponse(String accessToken, Long userId, String username) {
}
