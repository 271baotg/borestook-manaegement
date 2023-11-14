package com.example.bookstore_backend.model;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "orderhistory")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = true)
    private Customer customer;


    @Column(name="checkout_date")
    private Date checkoutDate;

    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "order",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<OrderDetail> orderDetails;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name="total")
    private Double total;

    @Override
    public int hashCode() {
        return Objects.hash(id, checkoutDate, username, total);
    }
=======

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Table( name = "orders")
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "customerID", nullable = true)
    private Customer customer;
    @Column(name = "create_date")
    private Date createDate;
    private String giftcode;

    private String username;
    private double total;
    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "order",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrderDetail> orderDetails;


>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215

}
