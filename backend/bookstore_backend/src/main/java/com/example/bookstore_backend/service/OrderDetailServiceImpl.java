package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.mapper.OrderDetailDTOMapper;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
    OrderDetailRepository repo;
    OrderDetailDTOMapper orderDetailDTOMapper;

    public OrderDetailServiceImpl(OrderDetailRepository repo, OrderDetailDTOMapper orderDetailDTOMapper) {
        this.repo = repo;
        this.orderDetailDTOMapper = orderDetailDTOMapper;
    }




    @Override
    public List<OrderDetailDTO> getOrderDetailFromOrderId(Long orderId) {
        return repo.findByOrderId(orderId)
                .stream()
                .map(orderDetailDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDetail> saveListOrderDetail(List<OrderDetail> list) {
        return repo.saveAll(list);
    }

}
