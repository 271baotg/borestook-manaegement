package com.example.bookstore_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copies_available;

    @Column(name = "category")
    private String category;


    public Book(String title, String author, String description, int copies, int copies_available, String category) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copies_available = copies_available;
        this.category = category;
    }
}
