package com.bank.backend.service;

import com.bank.backend.dto.AccountsDTO.request.CreateAccountRequest;
import com.bank.backend.dto.AccountsDTO.response.GetAccountResponse;
import com.bank.backend.entity.Accounts;
import com.bank.backend.exceptions.NotFoundException;
import com.bank.backend.repository.AccountsRepoInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountsService {
    private final AccountsRepoInterface accountsRepoInterface;

    public AccountsService(AccountsRepoInterface accountsRepoInterface){
        this.accountsRepoInterface = accountsRepoInterface;
    }

    public List<GetAccountResponse> getAccounts(Long userId) {
        List<Accounts> accounts = accountsRepoInterface.findByUserId(userId).orElseThrow(() -> new NotFoundException("Account Not Found"));

        return accounts.stream()
                .map(account -> new GetAccountResponse(
                        account.getAccountId(),
                        account.getAccountName(),
                        account.getBalance()))
                .toList();
    }

    public void createAccount(CreateAccountRequest createAccountRequest) {
        Accounts account = new Accounts();
        account.setUserId(createAccountRequest.userId());
        account.setAccountName(createAccountRequest.accountName().trim());
        account.setBalance(createAccountRequest.balance());

        accountsRepoInterface.save(account);
    }

    public void deleteAccount(int accountId, Long userId) {
        Accounts account = accountsRepoInterface
                .findByAccountIdAndUserId(accountId, userId)
                .orElseThrow(() ->
                        new NotFoundException("Account Not Found"));

        accountsRepoInterface.delete(account);
    }
}
