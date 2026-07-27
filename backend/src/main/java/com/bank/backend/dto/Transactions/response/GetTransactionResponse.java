package com.bank.backend.dto.Transactions.response;
import com.bank.backend.entity.Transactions.TransactionType;
import java.math.BigDecimal;

public record GetTransactionResponse(int transactionId, int accountId, BigDecimal amount, TransactionType transactionType) {
}
