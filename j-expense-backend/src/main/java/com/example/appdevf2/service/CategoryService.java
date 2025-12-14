package com.example.appdevf2.service;

import com.example.appdevf2.entity.CategoryDTO;
import com.example.appdevf2.entity.CategoryEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.CategoryRepository;
import com.example.appdevf2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE / UPDATE
    public CategoryEntity saveCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    // CREATE FROM DTO - associates user by ID
    public CategoryEntity createCategory(CategoryDTO dto) {
        logger.info("createCategory DTO - userID: {} category_name: {} category_type: {} is_default: {} iconPath: {}", dto.getUserID(), dto.getCategory_name(), dto.getCategory_type(), dto.getIs_default(), dto.getIconPath());
        CategoryEntity category = new CategoryEntity();
        category.setCategory_name(dto.getCategory_name());
        category.setCategory_type(dto.getCategory_type());
        category.setIs_default(dto.getIs_default() != null ? dto.getIs_default() : false);
        category.setIcon_path(dto.getIconPath());

        if (dto.getUserID() != null && dto.getUserID() > 0) {
            UserEntity user = userRepository.findById(dto.getUserID())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + dto.getUserID()));
            category.setUser(user);
        }

        return categoryRepository.save(category);
    }

    // READ ALL
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    // READ BY USER
    public List<CategoryEntity> getCategoriesByUser(int userId) {
        return categoryRepository.findByUserUserID(userId);
    }

    // READ BY ID
    public Optional<CategoryEntity> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    // DELETE
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}