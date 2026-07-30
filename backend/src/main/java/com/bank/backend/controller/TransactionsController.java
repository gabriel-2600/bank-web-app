package com.bank.backend.controller;

import com.bank.backend.dto.Transactions.request.DepositRequest;
import com.bank.backend.dto.Transactions.request.TransferRequest;
import com.bank.backend.dto.Transactions.request.WithdrawRequest;
import com.bank.backend.dto.Transactions.response.GetTransactionResponse;
import com.bank.backend.security.CustomUserDetails;
import com.bank.backend.service.TransactionsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<?> depositMoney(
            @RequestBody DepositRequest depositRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        transactionsService.depositTransaction(depositRequest, userDetails);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transferMoney(
            @RequestBody TransferRequest transferRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        int recipientAccountId = transactionsService.transferTransaction(userDetails, transferRequest);

        return ResponseEntity.ok().body(recipientAccountId);
    }

    @GetMapping("/get/all/{accountId}")
    public ResponseEntity<List<GetTransactionResponse>> getAllTransaction(
            @PathVariable int accountId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        List<GetTransactionResponse> allTransactions =
                transactionsService.getAllTransactions(accountId, userDetails);

        return ResponseEntity.ok(allTransactions);
    }
}
