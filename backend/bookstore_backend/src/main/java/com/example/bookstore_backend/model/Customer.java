package com.example.bookstore_backend.model;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "spent")
    private Double spent;

    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Column(name = "full_name", length = 50)
    private String fullName;

    @Column(name = "ranking")
    private int ranking;

    @Column(name = "create_date")
    private Date createDate;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private Set<Order> listOrder;

    @Override
    public int hashCode() {
        return Objects.hash(id, spent, phoneNumber, fullName, ranking, createDate);
    }
=======

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.Set;

@Data
@Table(name = "customer")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    private double spend;
    private String phoneNumber;
    private String name;
    private int ranking;

    @CreatedDate
    @Column(name = "create_date")
    private Date createDate;

    @OneToMany(mappedBy = "customer")
    private Set<Order> listOrder;
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
}
