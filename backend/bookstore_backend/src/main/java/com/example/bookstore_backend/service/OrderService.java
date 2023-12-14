package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.model.User;


import java.util.*;


public interface OrderService  {

    public List<OrderDTO> listOrder();
    public Optional<Order> orderById(Long id);

    public Order createOrder(OrderDTO orderDTO);

    public List<OrderDTO> getOrderBetweenDays(Date from, Date to);

    public Map<String, Object> getRevenueByMonthAndYear(Integer month, Integer year);

    public Map<String, Object> getMonthlyRevenueByYear(Integer year);

    public Map<String, Object> getCreateOrderNumByMonthYear(Integer month, Integer year);
    public List<Map<String, Object>> getTopSoldBook(Date from, Date to, Integer limit);
    public List<Map<String, Object>> getTopRevenueBook(Date from, Date to, Integer limit);
    List<Order> findOrderByUserName(String UserName);

}
