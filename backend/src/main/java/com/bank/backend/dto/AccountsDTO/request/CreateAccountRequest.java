package com.bank.backend.dto.AccountsDTO.request;

import java.math.BigDecimal;

public record CreateAccountRequest(Long userId, String accountName, BigDecimal balance) {
}
