package com.bank.backend.controller;

import com.bank.backend.dto.AccountsDTO.request.CreateAccountRequest;
import com.bank.backend.dto.AccountsDTO.response.GetAccountResponse;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.security.CustomUserDetails;
import com.bank.backend.service.AccountsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountsController {
    private final AccountsService accountsService;

    public  AccountsController(AccountsService accountsService){
        this.accountsService = accountsService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBankAccount(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateAccountRequest createAccountRequest){
        if (createAccountRequest.accountName() == null || createAccountRequest.accountName().isBlank()) {
            throw new InvalidInputException("Invalid Input");
        }

        if (createAccountRequest.balance() == null || createAccountRequest.balance().compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidInputException("Invalid Input");
        }

        accountsService.createAccount(userDetails, createAccountRequest);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllAccounts(@AuthenticationPrincipal CustomUserDetails userDetails){
        if(userDetails.getUserId() == null){
            throw new BadCredentialsException("Invalid");
        }

        List<GetAccountResponse> accountsList = accountsService.getAllAccounts(userDetails.getUserId());

        return ResponseEntity.ok().body(accountsList);
    }

    @GetMapping("/get/{accountId}")
    public ResponseEntity<?> getAccount(@PathVariable int accountId, @AuthenticationPrincipal CustomUserDetails userDetails){
        if(userDetails.getUserId() == null){
            throw new BadCredentialsException("Invalid");
        }

        GetAccountResponse getAccountResponse = accountsService.getAccount(accountId, userDetails);

        return ResponseEntity.ok().body(getAccountResponse);
    }

    @DeleteMapping("/delete/{accountId}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable int accountId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        accountsService.deleteAccount(accountId, userDetails.getUserId());

        return ResponseEntity.noContent().build();
    }
}
