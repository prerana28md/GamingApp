package com.example.gameapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "transactions")
public class Transaction {
    @Id
    private String id;
    private String memberId;
    private String gameId;
    private String memberName;
    private String gameName;
    private double amount;
    private Date date;

    public Transaction() { }
	public Transaction(String id, String memberId, String gameId, String memberName, String gameName, double amount, Date date) {
		super();
		this.id = id;
		this.memberId = memberId;
		this.gameId = gameId;
		this.memberName = memberName;
		this.gameName = gameName;
		this.amount = amount;
		this.date = date;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public String getGameId() {
		return gameId;
	}
	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

    // constructors, getters, setters
}
