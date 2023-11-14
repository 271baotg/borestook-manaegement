package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Order;


import java.util.List;
import java.util.Optional;


public interface OrderService  {

    public List<Order> listOrder();
    public Optional<Order> orderById(Long id);
}
