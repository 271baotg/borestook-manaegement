package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.dto.OrderDetailDTO;
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
    @GetMapping("orders")
    public List<OrderDTO> findAllOrder(){
        return orderService.listOrder();
    }

    @GetMapping("orders/{id}")

    public Optional<Order> findOrder(@PathVariable("id") Long id){
        return orderService.orderById(id);
    }

    @GetMapping("orderdetail/{id}")
    public List<OrderDetailDTO> getListOrderDetailFromOrderId(@PathVariable("id") Long id){
        return orderDetailService.getOrderDetailFromOrderId(id);
    }

    @PostMapping("orders")
        public OrderDTO createOrder(@RequestBody OrderDTO order){
        return order;
    }
}