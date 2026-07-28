package com.bank.backend.dto.TransfersDTO.response;

public record GetTransferResponse(int transferId, int transactionId, int recipientAccountId) {
}
