package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.appdevf2.entity.BudgetEntity;
import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.UserRepository;
import com.example.appdevf2.service.BudgetService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173") // allow React dev server
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private UserRepository userRepository;

    // POST: Create a new Budget
    @PostMapping
    public ResponseEntity<java.util.Map<String,Object>> createBudget(@RequestBody BudgetEntity budget) {
        // Ensure the request is authenticated and associate the budget with the current user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = auth.getName();
        var optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        UserEntity user = optUser.get();
        budget.setUser(user);

        BudgetEntity savedBudget = budgetService.saveBudget(budget);
        return new ResponseEntity<>(mapToMap(savedBudget), HttpStatus.CREATED);
    }

    // GET: Get budgets for current authenticated user
    @GetMapping
    public ResponseEntity<java.util.List<java.util.Map<String,Object>>> getAllBudgets() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = auth.getName();
        var optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        int userId = optUser.get().getUserID();
        var budgets = budgetService.getBudgetsByUserId(userId);
        List<java.util.Map<String,Object>> dtos = budgets.stream().map(this::mapToMap).toList();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    // GET: Get Budget by ID (only owner allowed)
    @GetMapping("/{budgetID}")
    public ResponseEntity<java.util.Map<String,Object>> getBudgetById(@PathVariable int budgetID) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = auth.getName();
        var optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        int currentUserId = optUser.get().getUserID();

        return budgetService.getBudgetById(budgetID)
                .map(budget -> {
                    if (budget.getUser() == null || budget.getUser().getUserID() != currentUserId) {
                        return new ResponseEntity<java.util.Map<String,Object>>(HttpStatus.FORBIDDEN);
                    }
                    return new ResponseEntity<>(mapToMap(budget), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update an existing Budget (only owner may update)
    @PutMapping("/{budgetID}")
    public ResponseEntity<java.util.Map<String,Object>> updateBudget(@PathVariable int budgetID, @RequestBody BudgetEntity budgetDetails) {
        // ensure authenticated
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = auth.getName();
        var optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        int currentUserId = optUser.get().getUserID();

        return budgetService.getBudgetById(budgetID)
                .map(existingBudget -> {
                    // check ownership
                    if (existingBudget.getUser() == null || existingBudget.getUser().getUserID() != currentUserId) {
                        return new ResponseEntity<java.util.Map<String,Object>>(HttpStatus.FORBIDDEN);
                    }

                    // Update fields
                    existingBudget.setType(budgetDetails.getType());
                    existingBudget.setName(budgetDetails.getName());
                    existingBudget.setCategory_name(budgetDetails.getCategory_name());
                    existingBudget.setTotal_amount(budgetDetails.getTotal_amount());
                    existingBudget.setPeriod(budgetDetails.getPeriod());
                    existingBudget.setBeginning(budgetDetails.getBeginning());
                    existingBudget.setFrequency(budgetDetails.getFrequency());

                    BudgetEntity updatedBudget = budgetService.saveBudget(existingBudget);
                    return new ResponseEntity<>(mapToMap(updatedBudget), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // --- Helper: map entity to DTO used by frontend ---
    private java.util.Map<String,Object> mapToMap(BudgetEntity b) {
        String beginning = b.getBeginning() != null ? b.getBeginning().toString() : null; // YYYY-MM-DD
        java.util.Map<String,Object> m = new java.util.HashMap<>();
        m.put("id", b.getBudgetID());
        m.put("type", b.getType());
        m.put("name", b.getName());
        m.put("category", b.getCategory_name());
        m.put("amount", b.getTotal_amount());
        m.put("period", b.getPeriod());
        m.put("beginning", beginning);
        m.put("frequency", b.getFrequency());
        return m;
    }

    // DELETE: Delete Budget by ID
    @DeleteMapping("/{budgetID}")
    public ResponseEntity<Void> deleteBudget(@PathVariable int budgetID) {
        if (budgetService.getBudgetById(budgetID).isPresent()) {
            budgetService.deleteBudget(budgetID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}