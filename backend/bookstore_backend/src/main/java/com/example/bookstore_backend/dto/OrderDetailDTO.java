package com.example.bookstore_backend.dto;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Order;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {


    private Order order;


    private BookDTO book;


    private int quantity;



}

