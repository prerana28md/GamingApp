package com.example.gameapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {
    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private int minPlayerCount;
    private int maxPlayerCount;
    private int playerCountMultiple;
    private int duration;
    private String status;

    public Game() { }
	public Game(String id, String name, double price, String description, int minPlayerCount, int maxPlayerCount,
			int playerCountMultiple, int duration, String status) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.minPlayerCount = minPlayerCount;
		this.maxPlayerCount = maxPlayerCount;
		this.playerCountMultiple = playerCountMultiple;
		this.duration = duration;
		this.status = status;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getMinPlayerCount() {
		return minPlayerCount;
	}
	public void setMinPlayerCount(int minPlayerCount) {
		this.minPlayerCount = minPlayerCount;
	}
	public int getMaxPlayerCount() {
		return maxPlayerCount;
	}
	public void setMaxPlayerCount(int maxPlayerCount) {
		this.maxPlayerCount = maxPlayerCount;
	}
	public int getPlayerCountMultiple() {
		return playerCountMultiple;
	}
	public void setPlayerCountMultiple(int playerCountMultiple) {
		this.playerCountMultiple = playerCountMultiple;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

    // constructors, getters, setters
}
