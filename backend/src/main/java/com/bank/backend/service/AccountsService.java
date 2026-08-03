package com.bank.backend.service;

import com.bank.backend.dto.AccountsDTO.request.CreateAccountRequest;
import com.bank.backend.dto.AccountsDTO.response.GetAccountResponse;
import com.bank.backend.entity.Accounts;
import com.bank.backend.exceptions.NotFoundException;
import com.bank.backend.repository.AccountsRepoInterface;
import com.bank.backend.security.CustomUserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountsService {
    private final AccountsRepoInterface accountsRepoInterface;

    public AccountsService(AccountsRepoInterface accountsRepoInterface){
        this.accountsRepoInterface = accountsRepoInterface;
    }

    public Accounts createAccount(CustomUserDetails userDetails, CreateAccountRequest createAccountRequest) {
        Accounts account = new Accounts();
        account.setUserId(userDetails.getUserId());
        account.setAccountName(createAccountRequest.accountName().trim());
        account.setBalance(createAccountRequest.balance());

        return accountsRepoInterface.save(account);
    }

    public List<GetAccountResponse> getAllAccounts(Long userId) {
        List<Accounts> accounts = accountsRepoInterface.findByUserId(userId).orElseThrow(() -> new NotFoundException("Account Not Found"));

        return accounts.stream()
                .map(account -> new GetAccountResponse(
                        account.getAccountId(),
                        account.getAccountName(),
                        account.getBalance()))
                .toList();
    }

    public GetAccountResponse getAccount(int accountId, CustomUserDetails userDetails){
        Accounts account = accountsRepoInterface.findByAccountIdAndUserId(accountId, userDetails.getUserId())
                .orElseThrow(() -> new NotFoundException("Account Not Found"));

        return new GetAccountResponse(account.getAccountId(), account.getAccountName(), account.getBalance());
    }

    public void deleteAccount(int accountId, Long userId) {
        Accounts account = accountsRepoInterface
                .findByAccountIdAndUserId(accountId, userId)
                .orElseThrow(() ->
                        new NotFoundException("Account Not Found"));

        accountsRepoInterface.delete(account);
    }
}
