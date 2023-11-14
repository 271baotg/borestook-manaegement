package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{

    OrderRepository repo;

    public OrderServiceImpl(OrderRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Order> listOrder() {
        return repo.findAll();
    }

    @Override
    public Optional<Order> orderById(Long id) {
        return  repo.findById(id);
    }
}
