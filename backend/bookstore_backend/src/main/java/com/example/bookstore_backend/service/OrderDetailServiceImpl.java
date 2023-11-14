package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
    OrderDetailRepository repo;

    public OrderDetailServiceImpl(OrderDetailRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<OrderDetail> getOrderDetailFromOrderId(Long orderId) {
        return repo.findByOrderId(orderId);
    }

}
