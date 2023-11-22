package com.example.bookstore_backend.mapper;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.model.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class OrderDTOMapper implements Function<Order, OrderDTO> {
    OrderDetailDTOMapper orderDetailDTOMapper;

    public OrderDTOMapper(OrderDetailDTOMapper orderDetailDTOMapper) {
        this.orderDetailDTOMapper = orderDetailDTOMapper;
    }

    @Override
    public OrderDTO apply(Order order) {
        List<OrderDetailDTO> listOrderDetail = order.getOrderDetails()
                .stream()
                .map(orderDetailDTOMapper)
                .collect(Collectors.toList());

        return new OrderDTO(order.getId(),
                order.getCustomer(),
                order.getCreateDate(),
                order.getGiftcode(),
                order.getUsername(),
                order.getTotal(),
                listOrderDetail);
    }
}
