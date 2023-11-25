package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@NoArgsConstructor
@Table(name = "order_detail")
@IdClass(OrderDetailPK.class)
public class OrderDetail {

    @Id
    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_ID")
    private Order order;

    @Id
    @ManyToOne
    @JoinColumn(name = "book_ID")
    private Book book;

    @Column(name = "quantity")
    private int quantity;

}
