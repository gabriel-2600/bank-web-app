package com.bank.backend.repository;

import com.bank.backend.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepoInterface extends JpaRepository<Accounts, Integer> {
    Optional<Accounts> findByAccountId(int accountId);
    Optional<List<Accounts>> findByUserId(Long userId);
    Optional<Accounts> findByAccountIdAndUserId(int accountId, Long userId);
}
