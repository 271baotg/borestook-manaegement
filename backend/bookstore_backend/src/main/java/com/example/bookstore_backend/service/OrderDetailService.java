package com.example.bookstore_backend.service;
import com.example.bookstore_backend.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> getOrderDetailFromOrderId(Long orderId);
}
