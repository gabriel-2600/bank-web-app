package com.bank.backend.dto.AccountsDTO.response;

import java.math.BigDecimal;

public record GetAccountResponse(int accountId,
                                 String accountName,
                                 BigDecimal balance) {
}
