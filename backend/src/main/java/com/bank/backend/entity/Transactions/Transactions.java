package com.bank.backend.entity.Transactions;
import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;

    @Column(name = "account_id")
    private int accountId;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", columnDefinition = "ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER')")
    private TransactionType transactionType;

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }
}


