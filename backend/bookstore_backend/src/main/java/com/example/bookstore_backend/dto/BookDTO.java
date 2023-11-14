package com.example.bookstore_backend.dto;

import com.example.bookstore_backend.model.Price;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;

    private String title;

    private String author;

    private String description;

    private int available;

    private String category;

    private String img;

    private Double price;
}
