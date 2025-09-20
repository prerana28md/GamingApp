package com.example.gameapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "admins")
public class Admin {
    @Id
    private String id;
    private Date date;
    private double amount;

    public Admin() { }

    public Admin(Date date, double amount) {
        this.date = date;
        this.amount = amount;
    }

	public Admin(String id, Date date, double amount) {
		super();
		this.id = id;
		this.date = date;
		this.amount = amount;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

    // getters and setters
}
