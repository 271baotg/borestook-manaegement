package com.example.bookstore_backend.repository;

<<<<<<< HEAD
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    public Optional<Order> findById(Integer id);
}
=======
import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    public Optional<Order> findById(long id);
}
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
