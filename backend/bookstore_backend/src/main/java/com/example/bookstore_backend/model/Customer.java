package com.example.bookstore_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.Set;

@Data
@Table(name = "customer")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Customer {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "spent")
    private double spent;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name = "name")
    private String fullName;
    @Column(name = "ranking")
    private int ranking;

    @CreationTimestamp
    @Column(name = "create_date")
    private Date createDate;

    @OneToMany(mappedBy = "customer")
    private Set<Order> listOrder;

    public Customer(double spent, String phoneNumber, String fullName, int ranking) {
        this.spent = spent;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.ranking = ranking;
    }
}
