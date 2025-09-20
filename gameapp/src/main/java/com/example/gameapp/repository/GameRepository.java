package com.example.gameapp.repository;

import com.example.gameapp.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    // Optional: find games by status
     List<Game> findByStatus(String status);
}
