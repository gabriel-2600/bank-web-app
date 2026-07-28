package com.bank.backend.service;

import com.bank.backend.dto.Transactions.request.DepositRequest;
import com.bank.backend.dto.Transactions.request.TransferRequest;
import com.bank.backend.dto.Transactions.request.WithdrawRequest;
import com.bank.backend.dto.Transactions.response.GetTransactionResponse;
import com.bank.backend.entity.Accounts;
import com.bank.backend.entity.Transactions.TransactionType;
import com.bank.backend.entity.Transactions.Transactions;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.exceptions.NotFoundException;
import com.bank.backend.repository.AccountsRepoInterface;
import com.bank.backend.repository.TransactionsRepoInterface;
import com.bank.backend.security.CustomUserDetails;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionsService {
    private final TransactionsRepoInterface transactionsRepoInterface;
    private final AccountsRepoInterface accountsRepoInterface;
    private final TransfersService transfersService;

    public TransactionsService(
            TransactionsRepoInterface transactionsRepoInterface,
            AccountsRepoInterface accountsRepoInterface,
            TransfersService transfersService
    ){
        this.transactionsRepoInterface = transactionsRepoInterface;
        this.accountsRepoInterface = accountsRepoInterface;
        this.transfersService = transfersService;
    }

    public int createTransaction(int accountId, BigDecimal amount, TransactionType transactionType){
        Transactions transaction = new Transactions();
        transaction.setAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setTransactionType(transactionType);

        transactionsRepoInterface.save(transaction);

        return transaction.getTransactionId();
    }

    public List<GetTransactionResponse> getAllTransactions(int accountId, CustomUserDetails userDetails){
        Accounts account = accountsRepoInterface.findByAccountIdAndUserId(accountId, userDetails.getUserId()).orElseThrow(() -> new NotFoundException("Not Found"));
        List<Transactions> transactions = transactionsRepoInterface.findAllByAccountId(account.getAccountId());

        return transactions.stream()
                .map(transaction -> new GetTransactionResponse(
                        transaction.getTransactionId(),
                        transaction.getAccountId(),
                        transaction.getAmount(),
                        transaction.getTransactionType()
                        ))
                .toList();
    }

    public GetTransactionResponse getTransaction(int accountId, CustomUserDetails userDetails){
        Accounts account = accountsRepoInterface.findByAccountIdAndUserId(accountId, userDetails.getUserId())
                .orElseThrow(() -> new NotFoundException("Account Not Found"));

        Transactions transaction = transactionsRepoInterface.findByAccountId(account.getAccountId()).orElseThrow(() -> new NotFoundException("Transaction Not Found"));

        return new GetTransactionResponse(transaction.getTransactionId(), transaction.getAccountId(), transaction.getAmount(), transaction.getTransactionType());
    }

    @Transactional
    public void withdrawTransaction(WithdrawRequest withdrawRequest,
                                    CustomUserDetails userDetails) {

        Accounts account = accountsRepoInterface
                .findByAccountIdAndUserId(withdrawRequest.accountId(), userDetails.getUserId())
                .orElseThrow(() -> new NotFoundException("Account not found."));

        if(withdrawRequest.amount() == null){
            throw new InvalidInputException("Invalid Input");
        }

        if (withdrawRequest.amount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidInputException("Invalid Amount");
        }

        if (account.getBalance().compareTo(withdrawRequest.amount()) < 0) {
            throw new InvalidInputException("Insufficient Funds");
        }

        account.setBalance(account.getBalance().subtract(withdrawRequest.amount()));
        accountsRepoInterface.save(account);

        createTransaction(withdrawRequest.accountId(), withdrawRequest.amount(), TransactionType.WITHDRAW);
    }

    @Transactional
    public void depositTransaction(DepositRequest depositRequest,
                                    CustomUserDetails userDetails) {

        Accounts account = accountsRepoInterface
                .findByAccountIdAndUserId(depositRequest.accountId(), userDetails.getUserId())
                .orElseThrow(() -> new NotFoundException("Account not found"));

        if(depositRequest.amount() == null){
            throw new InvalidInputException("Invalid Input");
        }

        if (depositRequest.amount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidInputException("Invalid Amount");
        }

        account.setBalance(account.getBalance().add(depositRequest.amount()));
        accountsRepoInterface.save(account);

        createTransaction(depositRequest.accountId(), depositRequest.amount(), TransactionType.DEPOSIT);
    }

    @Transactional
    public void transferTransaction(CustomUserDetails userDetails, TransferRequest transferRequest){
        if (transferRequest.senderAmount() == null) {
            throw new InvalidInputException("Invalid Input");
        }

        if (transferRequest.senderAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidInputException("Invalid Amount");
        }

        if (transferRequest.senderAccountId() == transferRequest.recipientAccountId()) {
            throw new InvalidInputException("Same Account Not Allowed");
        }

        Accounts senderAccount = accountsRepoInterface
                .findByAccountIdAndUserId(
                    transferRequest.senderAccountId(),
                    userDetails.getUserId())
                .orElseThrow(() -> new NotFoundException("Account Not Found"));

        Accounts recipientAccount = accountsRepoInterface
                .findByAccountId(
                        transferRequest.recipientAccountId())
                .orElseThrow(() -> new NotFoundException("Account Not Found"));

        if (senderAccount.getBalance().compareTo(transferRequest.senderAmount()) < 0) {
            throw new InvalidInputException("Insufficient Funds");
        }

        senderAccount.setBalance(
                senderAccount.getBalance()
                        .subtract(transferRequest.senderAmount()));


        recipientAccount.setBalance(
                recipientAccount.getBalance()
                        .add(transferRequest.senderAmount()));

        accountsRepoInterface.save(senderAccount);
        accountsRepoInterface.save(recipientAccount);

        int senderTransactionId = createTransaction(
                transferRequest.senderAccountId(),
                transferRequest.senderAmount(),
                TransactionType.TRANSFER_OUT
                );

        int recipientTransactionId = createTransaction(
                recipientAccount.getAccountId(),
                transferRequest.senderAmount(),
                TransactionType.TRANSFER_IN
        );

        transfersService.createTransfer(senderTransactionId, recipientTransactionId);
    }
}
