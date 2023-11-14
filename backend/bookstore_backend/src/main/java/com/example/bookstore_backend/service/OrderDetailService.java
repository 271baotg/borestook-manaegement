package com.example.bookstore_backend.service;

<<<<<<< HEAD
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.List;

@Service
public class OrderDetailService {
    @Autowired
    OrderDetailRepository repo;

    public List<OrderDetail> getOrderDetailFromOrderId(int orderId){
        return repo.findByOrderId(orderId);
    }
=======
import com.example.bookstore_backend.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> getOrderDetailFromOrderId(Long orderId);
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
}
