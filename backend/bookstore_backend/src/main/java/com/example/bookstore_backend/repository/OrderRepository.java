package com.example.bookstore_backend.repository;


import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    public Optional<Order> findById(long id);
    @Query("select o from Order o where o.username = ?1")
    List<Order> findOrdersByUsername(String username);

}
