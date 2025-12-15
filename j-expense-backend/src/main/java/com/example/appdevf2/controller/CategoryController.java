package com.example.appdevf2.controller;

import com.example.appdevf2.entity.CategoryEntity;
import com.example.appdevf2.service.CategoryService;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserRepository userRepository;

    // POST: Create a new Category
    @PostMapping
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody java.util.Map<String,Object> payload) {
        // Build category entity from payload
        String name = payload.getOrDefault("category_name", "").toString();
        String type = payload.getOrDefault("category_type", "expense").toString();
        boolean isDefault = Boolean.parseBoolean(String.valueOf(payload.getOrDefault("isDefault", "false")));

        if (name == null || name.isBlank()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        CategoryEntity category = new CategoryEntity();
        category.setCategory_name(name);
        category.setCategory_type(type);
        category.setIs_global(isDefault);

        // If marked as global, do not duplicate
        if (isDefault) {
            boolean exists = categoryService.getGlobalCategories().stream()
                    .anyMatch(c -> c.getCategory_name().equalsIgnoreCase(name));
            if (exists) return new ResponseEntity<>(HttpStatus.CONFLICT);
            category.setIs_global(true);
            category.setUser(null);
            CategoryEntity savedCategory = categoryService.saveCategory(category);
            return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
        }

        // Otherwise attach current authenticated user if present
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            userRepository.findByUsername(auth.getName()).ifPresent(user -> category.setUser(user));
        }
        category.setIs_global(false);

        CategoryEntity savedCategory = categoryService.saveCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    // GET: Get all Categories
    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        // Return global categories plus those owned by current user (if authenticated)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            var optUser = userRepository.findByUsername(auth.getName());
            if (optUser.isPresent()) {
                int uid = optUser.get().getUserID();
                java.util.List<CategoryEntity> globals = categoryService.getGlobalCategories();
                java.util.List<CategoryEntity> userCats = categoryService.getCategoriesByUserId(uid);
                java.util.List<CategoryEntity> combined = new java.util.ArrayList<>();
                combined.addAll(globals);
                combined.addAll(userCats);
                return new ResponseEntity<>(combined, HttpStatus.OK);
            }
        }

        // unauthenticated: only return global categories
        java.util.List<CategoryEntity> globals = categoryService.getGlobalCategories();
        return new ResponseEntity<>(globals, HttpStatus.OK);
    }

    // GET: Get categories for a specific user (includes global defaults)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CategoryEntity>> getCategoriesForUser(@PathVariable int userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        var optUser = userRepository.findByUsername(auth.getName());
        if (optUser.isEmpty()) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        if (optUser.get().getUserID() != userId) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        java.util.List<CategoryEntity> globals = categoryService.getGlobalCategories();
        java.util.List<CategoryEntity> userCats = categoryService.getCategoriesByUserId(userId);
        java.util.List<CategoryEntity> combined = new java.util.ArrayList<>();
        combined.addAll(globals);
        combined.addAll(userCats);
        return new ResponseEntity<>(combined, HttpStatus.OK);
    }

    // GET: Get Category by ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id)
                .map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update an existing Category
    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable int id, @RequestBody CategoryEntity categoryDetails) {
        return categoryService.getCategoryById(id)
                .map(existingCategory -> {
                    // Update fields
                    existingCategory.setCategory_name(categoryDetails.getCategory_name());
                    existingCategory.setCategory_type(categoryDetails.getCategory_type());
                    
                    CategoryEntity updatedCategory = categoryService.saveCategory(existingCategory);
                    return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // DELETE: Delete Category by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        if (categoryService.getCategoryById(id).isPresent()) {
            categoryService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}