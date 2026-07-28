package com.bank.backend.repository;

import com.bank.backend.entity.Transactions.TransactionType;
import com.bank.backend.entity.Transactions.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionsRepoInterface extends JpaRepository<Transactions, Integer> {
    List<Transactions> findAllByAccountId(int accountId);
    Optional<Transactions> findByAccountId(int accountId);
    List<Transactions> findAllByAccountIdAndTransactionType(
            int accountId,
            TransactionType transactionType
    );
}
