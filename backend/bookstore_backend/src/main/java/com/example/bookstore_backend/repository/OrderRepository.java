package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    public Optional<Order> findById(Integer id);
}