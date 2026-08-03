package com.bank.backend;

import com.bank.backend.dto.AccountsDTO.request.CreateAccountRequest;
import com.bank.backend.entity.Accounts;
import com.bank.backend.repository.AccountsRepoInterface;
import com.bank.backend.security.CustomUserDetails;
import com.bank.backend.service.AccountsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AccountsServiceTest {
    @Mock
    private CustomUserDetails userDetails;

    @Mock
    AccountsRepoInterface accountsRepoInterface;

    @InjectMocks
    AccountsService accountsService;

    @Test
    void createAccountShouldCreateSuccessfully(){
        //Arrange
        Accounts account = new Accounts();
        account.setAccountId(1);
        account.setUserId(1L);
        account.setAccountName("Savings");
        account.setBalance(BigDecimal.valueOf(62000));
        when(accountsRepoInterface.save(any(Accounts.class))).thenReturn(account);

        when(userDetails.getUserId()).thenReturn(account.getUserId());
        CreateAccountRequest createAccountRequest
                = new CreateAccountRequest(account.getAccountName(), account.getBalance());

        ArgumentCaptor<Accounts> captor = ArgumentCaptor.forClass(Accounts.class);


        // Act
        Accounts createdAccount = accountsService.createAccount(userDetails, createAccountRequest);

        //Assert
        verify(accountsRepoInterface).save(captor.capture());
        Accounts captureAccount = captor.getValue();

        assertEquals(account.getUserId(), captureAccount.getUserId());
        assertEquals(account.getAccountName(), captureAccount.getAccountName());
        assertEquals(account.getBalance(), captureAccount.getBalance());
    }
}
