package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@NoArgsConstructor

@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description", length = 600)
    private String description;

    @Column(name = "available")
    private int available;


    @Column(name = "img")
    private String img;

    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<OrderDetail> orderDetails;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "book_category",
                joinColumns = {@JoinColumn(name = "book_ID")},
                inverseJoinColumns = {@JoinColumn(name = "category_ID")})
    private List<Category> listCategory;


    public Book(String title, String author, String description, int available, String img, List<OrderDetail> orderDetails, List<Category> listCategory) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.available = available;
        this.img = img;
        this.orderDetails = orderDetails;
        this.listCategory = listCategory;
    }
}
