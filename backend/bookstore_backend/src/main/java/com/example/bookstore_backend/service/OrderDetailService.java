package com.example.bookstore_backend.service;
import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetailDTO> getOrderDetailFromOrderId(Long orderId);

    List<OrderDetail> saveListOrderDetail(List<OrderDetail> list);
}
