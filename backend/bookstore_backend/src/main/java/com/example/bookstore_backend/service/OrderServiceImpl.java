package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.mapper.OrderDTOMapper;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    OrderRepository repo;
    OrderDTOMapper orderDTOMapper;

    public OrderServiceImpl(OrderRepository repo, OrderDTOMapper orderDTOMapper) {
        this.repo = repo;
        this.orderDTOMapper = orderDTOMapper;
    }


    @Override
    public List<OrderDTO> listOrder() {
        return repo.findAll()
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Order> orderById(Long id) {
        return  repo.findById(id);
    }
}
