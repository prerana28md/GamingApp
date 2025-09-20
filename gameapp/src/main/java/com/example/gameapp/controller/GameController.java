package com.example.gameapp.controller;

import com.example.gameapp.model.Game;
import com.example.gameapp.service.GameService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping
    public Game addGame(@RequestBody Game game) {
        return gameService.addGame(game);
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable String id) {
        try {
            return gameService.getGameById(id);
        } catch (Exception e) {
            throw new RuntimeException("Game not found", e);
        }
    }

    @PutMapping("/{id}")
    public Game updateGame(@PathVariable String id, @RequestBody Game game) {
        try {
            return gameService.updateGame(id, game);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update game", e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
    }
}
