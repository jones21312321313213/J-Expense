package com.example.appdevf2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.appdevf2.entity.TransactionEntity;


public interface TransactionRepository extends JpaRepository<TransactionEntity,Integer> {

}
