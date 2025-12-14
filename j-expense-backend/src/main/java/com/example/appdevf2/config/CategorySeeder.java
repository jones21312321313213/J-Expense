package com.example.appdevf2.config;

import com.example.appdevf2.entity.CategoryEntity;
import com.example.appdevf2.repository.CategoryRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategorySeeder implements ApplicationRunner {

    private final CategoryRepository categoryRepository;

    public CategorySeeder(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<CategoryEntity> defaults = List.of(
                new CategoryEntity(0, "Food", "expense", true),
                new CategoryEntity(0, "Transport", "expense", true),
                new CategoryEntity(0, "Entertainment", "expense", true),
                new CategoryEntity(0, "Shopping", "expense", true),
                new CategoryEntity(0, "Salary", "income", true),
                new CategoryEntity(0, "Misc", "expense", true)
        );

        for (CategoryEntity c : defaults) {
            boolean exists = categoryRepository.existsGlobalByName(c.getCategory_name());
            if (!exists) {
                // Check if a non-global category with same name exists and promote it
                var opt = categoryRepository.findByNameIgnoreCase(c.getCategory_name());
                if (opt.isPresent()) {
                    CategoryEntity existing = opt.get();
                    existing.setIs_global(true);
                    existing.setUser(null);
                    categoryRepository.save(existing);
                } else {
                    // ensure stored as global
                    c.setIs_global(true);
                    categoryRepository.save(c);
                }
            }
        }
    }
}
