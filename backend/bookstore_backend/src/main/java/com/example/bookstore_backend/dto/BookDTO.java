package com.example.bookstore_backend.dto;

import com.example.bookstore_backend.model.Category;
import com.example.bookstore_backend.model.Price;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO implements Cloneable {
    private Long id;

    private String title;

    private String author;

    private String description;

    private int available;
    
    private String img;

    private Double price;
    private List<Category> categoryList;
}
