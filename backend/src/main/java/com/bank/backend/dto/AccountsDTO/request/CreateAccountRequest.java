package com.bank.backend.dto.AccountsDTO.request;

import java.math.BigDecimal;

public record CreateAccountRequest(String accountName, BigDecimal balance) {
}
