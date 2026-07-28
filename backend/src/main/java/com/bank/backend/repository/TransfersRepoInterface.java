package com.bank.backend.repository;

import com.bank.backend.entity.Transfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransfersRepoInterface extends JpaRepository<Transfers, Integer> {
    List<Transfers> findAllByTransactionId(int transactionId);
    Optional<Transfers> findByTransactionId(int transactionId);
}
