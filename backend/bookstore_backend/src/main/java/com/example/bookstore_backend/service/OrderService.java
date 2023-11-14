package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderService  {

    public List<Order> listOrder();
    public Optional<Order> orderById(Long id);
}
