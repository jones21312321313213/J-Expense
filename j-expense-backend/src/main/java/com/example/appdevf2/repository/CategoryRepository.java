package com.example.appdevf2.repository;

import com.example.appdevf2.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
	@org.springframework.data.jpa.repository.Query("select c from CategoryEntity c where c.is_global = true")
	java.util.List<CategoryEntity> findGlobalCategories();

	@org.springframework.data.jpa.repository.Query("select c from CategoryEntity c where c.user.userID = :userId")
	java.util.List<CategoryEntity> findByUserId(int userId);

	@org.springframework.data.jpa.repository.Query("select (count(c) > 0) from CategoryEntity c where c.category_name = :name and c.is_global = true")
	boolean existsGlobalByName(@org.springframework.data.repository.query.Param("name") String name);

	@org.springframework.data.jpa.repository.Query("select c from CategoryEntity c where lower(c.category_name) = lower(:name)")
	java.util.Optional<CategoryEntity> findByNameIgnoreCase(@org.springframework.data.repository.query.Param("name") String name);

}