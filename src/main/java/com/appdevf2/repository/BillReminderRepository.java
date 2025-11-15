package com.example.appdevf2.repository;

import com.example.appdevf2.entity.BillReminderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillReminderRepository extends JpaRepository<BillReminderEntity,Integer> {
}
