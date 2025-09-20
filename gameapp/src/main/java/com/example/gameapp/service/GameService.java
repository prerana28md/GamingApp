package com.example.gameapp.service;

import com.example.gameapp.model.Game;
import com.example.gameapp.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameById(String id) throws Exception {
        return gameRepository.findById(id).orElseThrow(() -> new Exception("Game not found"));
    }

    public Game updateGame(String id, Game updatedGame) throws Exception {
        Game existingGame = getGameById(id);
        existingGame.setName(updatedGame.getName());
        existingGame.setPrice(updatedGame.getPrice());
        existingGame.setDescription(updatedGame.getDescription());
        existingGame.setMinPlayerCount(updatedGame.getMinPlayerCount());
        existingGame.setMaxPlayerCount(updatedGame.getMaxPlayerCount());
        existingGame.setPlayerCountMultiple(updatedGame.getPlayerCountMultiple());
        existingGame.setDuration(updatedGame.getDuration());
        existingGame.setStatus(updatedGame.getStatus());
        return gameRepository.save(existingGame);
    }

    public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }
}
