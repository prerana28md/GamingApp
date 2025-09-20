package com.example.gameapp.repository;

import com.example.gameapp.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // Find all transactions of a member
    List<Transaction> findByMemberId(String memberId);

    // Find all transactions for a specific game
    List<Transaction> findByGameId(String gameId);

}
