package com.bank.backend.dto.Transactions.request;

import java.math.BigDecimal;

public record WithdrawRequest(int accountId, BigDecimal amount) {
}
