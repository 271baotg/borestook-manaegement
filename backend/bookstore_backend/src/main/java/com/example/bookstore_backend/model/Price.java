package com.example.bookstore_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.util.Objects;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "price")
@IdClass(PricePK.class)

public class Price {
    @Id
    private long bookID;

    public void setBookID(long bookID) {
        this.bookID = bookID;
    }

    @Column(name = "price", nullable = true)
    private Double price;

    public void setPrice(Double price) {
        this.price = price;
    }

    @Id
    @CreatedDate
    @Column(name = "start_date")
    private Date startDate;

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Price(long bookID, Double price) {
        this.bookID = bookID;
        this.price = price;
    }
}
