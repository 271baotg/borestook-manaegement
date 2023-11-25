package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.service.BookService;
import com.example.bookstore_backend.service.OrderDetailService;
import com.example.bookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    BookService bookService;
    @GetMapping("order")
    public List<Order> findAllOrder(){
        return orderService.listOrder();
    }

    @GetMapping("order/{id}")

    public Optional<Order> findOrder(@PathVariable("id") Long id){
        return orderService.orderById(id);
    }

    @GetMapping("orderdetail/{id}")
    public List<OrderDetail> getListOrderDetailFromOrderId(@PathVariable("id") Long id){
        return orderDetailService.getOrderDetailFromOrderId(id);
    }

    @PostMapping("order")
        public Order createOrder(@RequestBody Order order){
        return order;
    }
}