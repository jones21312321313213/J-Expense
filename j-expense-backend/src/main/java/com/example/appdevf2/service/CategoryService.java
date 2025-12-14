package com.example.appdevf2.service;

import com.example.appdevf2.entity.CategoryEntity;
import com.example.appdevf2.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // CREATE / UPDATE
    public CategoryEntity saveCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    // READ ALL
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    // READ BY ID
    public Optional<CategoryEntity> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

        public List<CategoryEntity> getGlobalCategories() {
        return categoryRepository.findGlobalCategories();
    }

    public List<CategoryEntity> getCategoriesByUserId(int userId) {
        return categoryRepository.findByUserId(userId);
    }

    // DELETE
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}