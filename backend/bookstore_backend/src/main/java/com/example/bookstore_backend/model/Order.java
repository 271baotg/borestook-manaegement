package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Table( name = "orders")
@Entity
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "customerID", nullable = true)
    private Customer customer;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "gift_code")
    private String giftcode;
    @Column(name = "username")
    private String username;
    @Column(name = "total")
    private double total;
    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "order",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;


}
