//package com.example.bookstore_backend.mapper;
//
//import com.example.bookstore_backend.dto.OrderDetailDTO;
//import com.example.bookstore_backend.model.Order;
//import com.example.bookstore_backend.model.OrderDetail;
//import com.example.bookstore_backend.repository.PriceRepository;
//
//import java.util.function.Function;
//
//public class OrderDetailDTOMapper implements Function<OrderDetail, OrderDetailDTO> {
//
//    private PriceRepository priceRepository;
//
//    public OrderDetailDTOMapper(PriceRepository priceRepository) {
//        this.priceRepository = priceRepository;
//    }
//
//    @Override
//    public OrderDetailDTO apply(OrderDetail orderDetail) {
//
//        return new OrderDetailDTO(
//                orderDetail.getOrder().getId(),
//                orderDetail.getBook().getId()
//
//        )
//    }
//}
