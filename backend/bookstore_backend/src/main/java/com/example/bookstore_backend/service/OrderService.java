package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Order;
<<<<<<< HEAD
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
=======
import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215

import java.util.List;
import java.util.Optional;

<<<<<<< HEAD
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
=======
public interface OrderService  {

    public List<Order> listOrder();
    public Optional<Order> orderById(Long id);
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
}
