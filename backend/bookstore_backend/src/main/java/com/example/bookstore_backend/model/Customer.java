package com.example.bookstore_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Data
@NoArgsConstructor
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="full_name")
    String fullName;
    @Column(name="phone_number")
    String phoneNumber;
    @Column(name="ranking")
    String ranking;
    @Column(name="spent")
    Double spent;
    @Column(name = "created_date")
    Time CreatedDate;

    public Customer(int id, String fullName, String phoneNumber, String ranking, Double spent, Time createdDate) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.ranking = ranking;
        this.spent = spent;
        CreatedDate = createdDate;
    }
}
