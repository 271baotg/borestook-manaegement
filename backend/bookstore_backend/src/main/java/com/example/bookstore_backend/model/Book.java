package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;

    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<OrderDetail> orderDetails;

<<<<<<< HEAD
    public Book(int id, String title, String author, String description, int copies, int copies_available, String category, String img) {
=======
    public Book(Long id, String title, String author, String description, int copies, int copies_available, String category, String img) {
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.available = copies_available;
        this.category = category;
        this.img = img;
    }

}
