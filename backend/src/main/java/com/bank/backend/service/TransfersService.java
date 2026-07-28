package com.bank.backend.service;

import com.bank.backend.entity.Transfers;
import com.bank.backend.repository.TransfersRepoInterface;
import org.springframework.stereotype.Service;

@Service
public class TransfersService {
    private final TransfersRepoInterface transfersRepoInterface;

    public TransfersService(TransfersRepoInterface transfersRepoInterface){
        this.transfersRepoInterface = transfersRepoInterface;
    }

    public void createTransfers(int transactionId, int recipientAccoundId){
        Transfers transfer = new Transfers();
        transfer.setTransactionId(transactionId);
        transfer.setRecipientAccountId(recipientAccoundId);

        transfersRepoInterface.save(transfer);
    }

    public
}
