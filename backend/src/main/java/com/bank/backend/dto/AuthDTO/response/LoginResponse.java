package com.bank.backend.dto.AuthDTO.response;

import com.bank.backend.dto.UserDTO.response.UserDetailsResponse;

public record LoginResponse(String accessToken, UserDetailsResponse userDetailsResponse) {
}
