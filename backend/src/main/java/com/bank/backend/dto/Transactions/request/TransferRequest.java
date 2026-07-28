package com.bank.backend.dto.Transactions.request;

import java.math.BigDecimal;

public record TransferRequest(BigDecimal senderAmount, int senderAccountId, int recipientAccountId) {
}
