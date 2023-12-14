package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.model.User;


import java.util.List;
import java.util.Optional;


public interface OrderService  {

    public List<OrderDTO> listOrder();
    public Optional<Order> orderById(Long id);

    public Order createOrder(OrderDTO orderDTO);

    List<Order> findOrderByUserName(String UserName);

}
