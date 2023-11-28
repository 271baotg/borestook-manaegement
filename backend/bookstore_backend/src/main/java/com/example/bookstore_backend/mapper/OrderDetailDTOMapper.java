package com.example.bookstore_backend.mapper;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.repository.OrderDetailRepository;
import com.example.bookstore_backend.repository.PriceRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
public class OrderDetailDTOMapper implements Function<OrderDetail, OrderDetailDTO> {

    private OrderDetailRepository orderDetailRepository;
    private PriceRepository priceRepository;
    private BookDTOMapper bookDTOMapper;

    public OrderDetailDTOMapper(OrderDetailRepository orderDetailRepository, PriceRepository priceRepository, BookDTOMapper bookDTOMapper) {
        this.orderDetailRepository = orderDetailRepository;
        this.priceRepository = priceRepository;
        this.bookDTOMapper = bookDTOMapper;
    }

    @Override
    public OrderDetailDTO apply(OrderDetail orderDetail) {
        Order order = orderDetail.getOrder();

        Price latestPrice = priceRepository.findLatestPriceByDate(orderDetail.getBook().getId(), order.getCreateDate());
        BookDTO bookDTO = bookDTOMapper.apply(orderDetail.getBook());
        bookDTO.setPrice(latestPrice.getPrice());
        return new OrderDetailDTO(orderDetail.getOrder(), bookDTO, orderDetail.getQuantity());

    }
}
