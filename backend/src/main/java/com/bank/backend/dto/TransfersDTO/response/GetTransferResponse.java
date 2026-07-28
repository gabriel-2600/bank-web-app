package com.bank.backend.dto.TransfersDTO.response;

import java.math.BigDecimal;

public record GetTransferResponse(
        int transferId,
        int senderTransactionId,
        int recipientTransactionId
) {}
