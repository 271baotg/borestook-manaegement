package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.service.OrderDetailServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderDetailController {
    OrderDetailServiceImpl orderDetailService;

    public OrderDetailController(OrderDetailServiceImpl orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

}
