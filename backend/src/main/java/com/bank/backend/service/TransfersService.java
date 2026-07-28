package com.bank.backend.service;

import com.bank.backend.dto.TransfersDTO.response.GetTransferResponse;
import com.bank.backend.entity.Accounts;
import com.bank.backend.entity.Transactions.TransactionType;
import com.bank.backend.entity.Transactions.Transactions;
import com.bank.backend.entity.Transfers;
import com.bank.backend.exceptions.NotFoundException;
import com.bank.backend.repository.AccountsRepoInterface;
import com.bank.backend.repository.TransactionsRepoInterface;
import com.bank.backend.repository.TransfersRepoInterface;
import com.bank.backend.security.CustomUserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransfersService {
    private final TransfersRepoInterface transfersRepoInterface;
    private final AccountsRepoInterface accountsRepoInterface;
    private final TransactionsRepoInterface transactionsRepoInterface;

    public TransfersService(
            TransfersRepoInterface transfersRepoInterface,
            AccountsRepoInterface accountsRepoInterface,
            TransactionsRepoInterface transactionsRepoInterface
        ){
        this.transfersRepoInterface = transfersRepoInterface;
        this.accountsRepoInterface = accountsRepoInterface;
        this.transactionsRepoInterface = transactionsRepoInterface;
    }

    public void createTransfer(int senderTransactionId, int recipientTransactionId){
        Transfers transfer = new Transfers();
        transfer.setSenderTransactionId(senderTransactionId);
        transfer.setRecipientTransactionId(recipientTransactionId);

        transfersRepoInterface.save(transfer);
    }

    public List<GetTransferResponse> getAllTransfer(int accountId, CustomUserDetails userDetails){
        Accounts account = accountsRepoInterface.findByAccountIdAndUserId(accountId, userDetails.getUserId()).orElseThrow(() -> new NotFoundException("Account Not Found"));

        List<Transactions> transferOutTransactions =
                transactionsRepoInterface.findAllByAccountIdAndTransactionType(
                        account.getAccountId(),
                        TransactionType.TRANSFER_OUT
                );


        List<Transactions> transferInTransactions =
                transactionsRepoInterface.findAllByAccountIdAndTransactionType(
                        account.getAccountId(),
                        TransactionType.TRANSFER_IN
                );

        List<GetTransferResponse> transfers = new ArrayList<>();


        for (Transactions transaction : transferOutTransactions) {

            Transfers transfer = transfersRepoInterface
                    .findBySenderTransactionId(transaction.getTransactionId())
                    .orElseThrow(() -> new NotFoundException("Transfer Not Found"));

            transfers.add(new GetTransferResponse(
                    transfer.getTransferId(),
                    transaction.getTransactionId(),
                    transfer.getRecipientTransactionId()
            ));
        }

        for (Transactions transaction : transferInTransactions) {
            Transfers transfer = transfersRepoInterface
                    .findByRecipientTransactionId(transaction.getTransactionId())
                    .orElseThrow(() -> new NotFoundException("Transfer Not Found"));

            transfers.add(new GetTransferResponse(
                    transfer.getTransferId(),
                    transfer.getSenderTransactionId(),
                    transaction.getTransactionId()
            ));
        }

        return transfers;

    }
}
