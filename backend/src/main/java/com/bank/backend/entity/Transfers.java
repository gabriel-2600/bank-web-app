package com.bank.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name  = "transfers")
public class Transfers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private int transferId;

    @Column(name = "transaction_id")
    private int transactionId;

    @Column(name = "recipient_account_id")
    private int recipientAccountId;

    public int getTransferId() {
        return transferId;
    }

    public void setTransferId(int transferId) {
        this.transferId = transferId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getRecipientAccountId() {
        return recipientAccountId;
    }

    public void setRecipientAccountId(int recipientAccountId) {
        this.recipientAccountId = recipientAccountId;
    }
}
