package com.example.bookstore_backend.repository;


import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    public Optional<Order> findById(long id);
}
