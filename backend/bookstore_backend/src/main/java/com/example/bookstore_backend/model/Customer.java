package com.example.bookstore_backend.model;


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
}
