package com.example.gameapp.controller;

import com.example.gameapp.model.Transaction;
import com.example.gameapp.service.TransactionServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionServiceImpl transactionService;

    public TransactionController(TransactionServiceImpl transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        try {
            return transactionService.addTransaction(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add transaction", e);
        }
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/member/{memberId}")
    public List<Transaction> getTransactionsByMember(@PathVariable String memberId) {
        return transactionService.getTransactionsByMember(memberId);
    }

    @GetMapping("/game/{gameId}")
    public List<Transaction> getTransactionsByGame(@PathVariable String gameId) {
        return transactionService.getTransactionsByGame(gameId);
    }
}
