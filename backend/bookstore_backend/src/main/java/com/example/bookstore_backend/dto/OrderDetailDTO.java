package com.example.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    private long orderId;;
    private long bookId;
    private int quantity;
    private double price;
}
