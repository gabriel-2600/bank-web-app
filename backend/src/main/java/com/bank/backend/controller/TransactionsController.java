package com.bank.backend.controller;

import com.bank.backend.dto.Transactions.request.DepositRequest;
import com.bank.backend.dto.Transactions.request.WithdrawRequest;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.security.CustomUserDetails;
import com.bank.backend.service.TransactionsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
public class TransactionsController {
    private final TransactionsService transactionsService;

    public TransactionsController(TransactionsService transactionsService){
        this.transactionsService = transactionsService;
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdrawAmount(
            @RequestBody WithdrawRequest withdrawRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        transactionsService.withdrawTransaction(withdrawRequest, userDetails);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> depositAmount(
            @RequestBody DepositRequest depositRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        transactionsService.depositTransaction(depositRequest, userDetails);

        return ResponseEntity.noContent().build();
    }
}
