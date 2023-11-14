package com.example.bookstore_backend.model;

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
}
