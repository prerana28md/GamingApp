package com.example.gameapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "recharges")
public class Recharge {
    @Id
    private String id;
    private String memberId;
    private double amount;
    private Date date;

    public Recharge() { }

    public Recharge(String memberId, double amount, Date date) {
        this.memberId = memberId;
        this.amount = amount;
        this.date = date;
    }

	public Recharge(String id, String memberId, double amount, Date date) {
		super();
		this.id = id;
		this.memberId = memberId;
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

    // getters and setters
}
