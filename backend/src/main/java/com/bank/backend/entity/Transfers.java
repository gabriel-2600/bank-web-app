package com.bank.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name  = "transfers")
public class Transfers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private int transferId;

    @Column(name = "sender_transaction_id")
    private int senderTransactionId;

    @Column(name = "recipient_transaction_id")
    private int recipientTransactionId;

    public int getTransferId() {
        return transferId;
    }

    public void setTransferId(int transferId) {
        this.transferId = transferId;
    }

    public int getSenderTransactionId() {
        return senderTransactionId;
    }

    public void setSenderTransactionId(int senderTransactionId) {
        this.senderTransactionId = senderTransactionId;
    }

    public int getRecipientTransactionId() {
        return recipientTransactionId;
    }

    public void setRecipientTransactionId(int recipientTransactionId) {
        this.recipientTransactionId = recipientTransactionId;
    }
}
