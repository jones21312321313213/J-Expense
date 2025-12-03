package com.example.appdevf2.repository;

import com.example.appdevf2.entity.RecurringTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransactionEntity, Integer> {
    List<RecurringTransactionEntity> findByRecurringDateBefore(Date date);
}