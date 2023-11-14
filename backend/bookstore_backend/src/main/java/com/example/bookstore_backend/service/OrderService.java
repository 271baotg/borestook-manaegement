package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository repo;

    public List<Order> listOrder(){
        return (List<Order>) repo.findAll();
    }

    public Optional<Order> orderById(int id){
        return  repo.findById(id);
    }
}
