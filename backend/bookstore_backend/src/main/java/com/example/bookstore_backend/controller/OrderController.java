package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.service.BookService;
import com.example.bookstore_backend.service.OrderDetailService;
import com.example.bookstore_backend.service.OrderService;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Transactional
    @GetMapping("orders/get-revenue-by-month-and-year")
    public Map<String, Object> getRevenueByMonthAndYear(@Param("month") Integer month, @Param("year") Integer year){
        return orderService.getRevenueByMonthAndYear(month, year);
    }

    @Transactional
    @GetMapping("orders/get-monthly-revenue-by-year")
    public Map<String, Object> getMonthlyRevenueByYear(@Param("year") Integer year){
        return orderService.getMonthlyRevenueByYear(year);
    }

    @Transactional
    @GetMapping("orders/count")
    public Map<String, Object> getCreateOrderNumByMonthYear(@Param("month") Integer month,@Param("year") Integer year){
        return orderService.getCreateOrderNumByMonthYear(month, year);
    }

    @PostMapping("orders")
    public Order createOrder(@RequestBody OrderDTO order){
        return orderService.createOrder(order);
    }



}