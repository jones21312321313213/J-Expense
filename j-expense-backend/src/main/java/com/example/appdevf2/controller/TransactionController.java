package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.TransactionDTO;
import com.example.appdevf2.entity.TransactionEntity;
import com.example.appdevf2.service.TransactionService;

@RestController
@RequestMapping("api/transaction")
@CrossOrigin(origins = "http://localhost:5173") 
public class TransactionController {

    @Autowired
    private TransactionService tserv;

    // C - create a transaction
    @PostMapping("/insertTransaction")
    public TransactionEntity insertTransaction(@RequestBody TransactionDTO transaction) {
        System.out.println("insertTransaction DTO: " + transaction); // uses @ToString
        return tserv.insertTransaction(transaction);
    }

    // R - read all transactions
    @GetMapping("/getAllTransactions")
    public List<TransactionEntity> getAllTransactions() {
        return tserv.getAllTransactions();
    }


    // @GetMapping("/getTransaction/{id}")
    // public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable int id){
    //       TransactionEntity transaction = tserv.getTransactionById(id); 

    //       if(transaction != null){
    //         return ResponseEntity.ok(transaction);
    //       }else{
    //         return ResponseEntity.notFound().build();
    //       }
    // }

    @GetMapping("/getTransaction/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable int id) {
        TransactionEntity transaction = tserv.getTransactionById(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/getTransactionsByUser/{userId}")
    public List<TransactionEntity> getTransactionsByUser(@PathVariable int userId) {
        return tserv.getTransactionsByUser(userId);
    }

    

    
    // U - update a transaction
    // @PutMapping("/updateTransaction")
    // public TransactionEntity updateTransaction(@RequestParam int tid, @RequestBody TransactionEntity newTransactionDetails) {
    //     return tserv.updateTransaction(tid, newTransactionDetails);
    // }

    // U - update a transaction
    @PutMapping("/updateTransaction")
    public TransactionEntity updateTransaction(@RequestParam int tid, @RequestBody TransactionDTO newTransactionDetails) {
        return tserv.updateTransaction(tid, newTransactionDetails);
    }

    // D - delete a transaction
    @DeleteMapping("/deleteTransaction/{tid}")
    public String deleteTransaction(@PathVariable int tid) {
        return tserv.deleteTransaction(tid);
    }
}
