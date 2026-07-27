package com.bank.backend.dto.Transactions.request;

import java.math.BigDecimal;

public record DepositRequest(int accountId, BigDecimal amount) {
}
