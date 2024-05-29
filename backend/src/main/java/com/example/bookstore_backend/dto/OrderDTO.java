package com.example.bookstore_backend.dto;

import com.example.bookstore_backend.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private long id;

    private Customer customer;

    private Date createDate;

    private String giftcode;

    private String username;

    private double total;

    private List<OrderDetailDTO> orderDetails;
}
