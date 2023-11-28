package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Table( name = "orders")
@Entity
@Data
@NoArgsConstructor
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


    @Builder
    public Order(long id, Customer customer, Date createDate, String giftcode, String username, double total, List<OrderDetail> orderDetails) {
        this.id = id;
        this.customer = customer;
        this.createDate = createDate;
        this.giftcode = giftcode;
        this.username = username;
        this.total = total;
        this.orderDetails = orderDetails;
    }
}
