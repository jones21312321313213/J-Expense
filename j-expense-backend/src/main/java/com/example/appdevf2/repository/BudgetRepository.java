package com.example.appdevf2.repository;

import com.example.appdevf2.entity.BudgetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<BudgetEntity, Integer> {
	@org.springframework.data.jpa.repository.Query("SELECT b FROM BudgetEntity b WHERE b.user.userID = :userId")
	java.util.List<BudgetEntity> findByUserId(@org.springframework.data.repository.query.Param("userId") int userId);

}