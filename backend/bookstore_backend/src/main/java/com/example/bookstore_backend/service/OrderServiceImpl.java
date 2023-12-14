package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.mapper.BookDTOMapper;
import com.example.bookstore_backend.mapper.OrderDTOMapper;
import com.example.bookstore_backend.mapper.OrderDetailDTOMapper;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.BookRepository;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{
    BookDTOMapper bookDTOMapper;

    OrderRepository repo;
    OrderDTOMapper orderDTOMapper;
    OrderDetailDTOMapper orderDetailDTOMapper;
    OrderDetailService orderDetailService;
    BookService bookService;

    public OrderServiceImpl(OrderRepository repo,
                            OrderDTOMapper orderDTOMapper,
                            OrderDetailDTOMapper orderDetailDTOMapper,
                            OrderDetailService orderDetailService,
                            BookDTOMapper bookDTOMapper,
                            BookService bookService) {
        this.repo = repo;
        this.orderDTOMapper = orderDTOMapper;
        this.orderDetailDTOMapper = orderDetailDTOMapper;
        this.orderDetailService = orderDetailService;
        this.bookDTOMapper = bookDTOMapper;
        this.bookService = bookService;
    }


    @Override
    public List<OrderDTO> listOrder() {
        return repo.findAll()
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Order> orderById(Long id) {
        return  repo.findById(id);
    }

    @Override
    public Order createOrder(OrderDTO orderDTO) {

        Customer customer = orderDTO.getCustomer();
        Order orderTemp;
        if (customer.getFullName() != null ){
            orderTemp = Order.builder()
                    .total(orderDTO.getTotal())
                    .giftcode(orderDTO.getGiftcode())
                    .customer(customer)
                    .username(orderDTO.getUsername())
                    .createDate(Date.from(Instant.now()))
                    .build();
            // Save the order or perform other actions
        } else {
            // Handle the case where the customer is null, such as logging a message or throwing an exception
            orderTemp = Order.builder()
                    .total(orderDTO.getTotal())
                    .customer(null)
                    .giftcode(orderDTO.getGiftcode())
                    .username(orderDTO.getUsername())
                    .createDate(Date.from(Instant.now()))
                    .build();
        }
        Order savedOrder = repo.save(orderTemp);

        List<OrderDetail> listOrder = orderDTO.getOrderDetails().stream()
                .map(orderDetailDTO -> {
                    long bookId = orderDetailDTO.getBook().getId();
                    Book optionalBook = bookService.findById(bookId)
                            .orElseThrow(() -> new RuntimeException("Book with ID " + bookId + " not found"));
                    int newAvailable = optionalBook.getAvailable() - orderDetailDTO.getQuantity();
                    optionalBook.setAvailable(newAvailable);
                    Book updatedBook = bookService.update(optionalBook);
                    Book book = bookDTOMapper.mapToBook(orderDetailDTO.getBook());
                    book.setAvailable(newAvailable);
                    return new OrderDetail(savedOrder,book,orderDetailDTO.getQuantity());
                })
                .collect(Collectors.toList());

        orderDetailService.saveListOrderDetail(listOrder);

        return savedOrder;
    }
}
