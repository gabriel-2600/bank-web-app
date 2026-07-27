package com.bank.backend.repository;

import com.bank.backend.entity.Transfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransfersRepoInterface extends JpaRepository<Transfers, Integer> {

}
