package com.example.gameapp.service;

import com.example.gameapp.model.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction addTransaction(Transaction transaction) throws Exception;
    List<Transaction> getAllTransactions();
    List<Transaction> getTransactionsByMember(String memberId);
    List<Transaction> getTransactionsByGame(String gameId);
}
