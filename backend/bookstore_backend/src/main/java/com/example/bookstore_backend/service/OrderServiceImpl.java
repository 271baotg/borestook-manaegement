package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.dto.OrderDetailDTO;
import com.example.bookstore_backend.mapper.BookDTOMapper;
import com.example.bookstore_backend.mapper.OrderDTOMapper;
import com.example.bookstore_backend.mapper.OrderDetailDTOMapper;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import com.example.bookstore_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class OrderServiceImpl implements OrderService {
    BookDTOMapper bookDTOMapper;

    OrderRepository repo;
    OrderDTOMapper orderDTOMapper;
    OrderDetailDTOMapper orderDetailDTOMapper;
    OrderDetailService orderDetailService;

    public OrderServiceImpl(OrderRepository repo, OrderDTOMapper orderDTOMapper, OrderDetailDTOMapper orderDetailDTOMapper, OrderDetailService orderDetailService, BookDTOMapper bookDTOMapper) {
        this.repo = repo;
        this.orderDTOMapper = orderDTOMapper;
        this.orderDetailDTOMapper = orderDetailDTOMapper;
        this.orderDetailService = orderDetailService;
        this.bookDTOMapper = bookDTOMapper;
    }


    @Override
    public List<OrderDTO> listOrder() {
        return repo.findAll()
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getOrderBetweenDays(Date from, Date to) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String fromDateToString = formatter.format(from);
        String toDateToString = formatter.format(to);


        List<Order> data = repo.findOrderBetweenDays(fromDateToString, toDateToString);
        List<OrderDTO> res = data
                .stream()
                .map(orderDTOMapper)
                .collect(Collectors.toList());

        return res;

    }


    @Override
    public Optional<Order> orderById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Order createOrder(OrderDTO orderDTO) {

        Customer customer = orderDTO.getCustomer();
        Order orderTemp;
        if (customer.getFullName() != null) {
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
                    Book book = bookDTOMapper.mapToBook(orderDetailDTO.getBook());
                    return new OrderDetail(savedOrder, book, orderDetailDTO.getQuantity());
                })
                .collect(Collectors.toList());

        orderDetailService.saveListOrderDetail(listOrder);

        return savedOrder;
    }


    @Override
    public Map<String, Object> getRevenueByMonthAndYear(Integer month, Integer year) {
        Map<String, Object> res = new HashMap<>();
        Double sum = repo.fetchSumByMonthAndYearSP(month, year).get()[0];

        res.put("month", month);
        res.put("year", year);
        res.put("sum", sum);
        return res;
    }

    @Override
    public Map<String, Object> getMonthlyRevenueByYear(Integer year) {
        Map<String, Object> res = new HashMap<>();
        List<Object> tempResList = new ArrayList<>();
        Double tempRevenue;

        for (int i = 0; i < 12; i++) {
            tempRevenue = repo.fetchSumByMonthAndYearSP(i + 1, year).get()[0];
            tempResList.add(tempRevenue);
        }
        res.put("revenue", tempResList);

        return res;
    }

    @Override
    public Map<String, Object> getCreateOrderNumByMonthYear(Integer month, Integer year) {
        Map<String, Object> res = new HashMap<>();
        Integer count = repo.getCreatedOrderNumByMonthYear(month, year).get()[0];

        res.put("month", month);
        res.put("year", year);
        res.put("count", count);

        return res;
    }

    public List<Map<String, Object>> getTopSoldBook(Date from, Date to, Integer limit) {
        List<Map<String, Object>> res = new ArrayList<>();
        List<BookDTO> bookList = new ArrayList<>();
        List<Integer> sold = new ArrayList<>();
        List<Double> revenue = new ArrayList<>();
        List<OrderDTO> orderList = getOrderBetweenDays(from, to);
        List<OrderDetailDTO> orderDetailList = new ArrayList<>();

        orderList.forEach((order) ->
                order.getOrderDetails().forEach((orderDetail) ->
                        orderDetailList.add(orderDetail)
                ));
        //gán cho giá trị cho biến bookList và sold
        for (int i = 0; i < orderDetailList.size(); i++) {
            OrderDetailDTO o = orderDetailList.get(i);
            boolean isExists = false;
            for (int j = 0; j < bookList.size(); j++) {
                if (bookList.get(j).getId() == o.getBook().getId()) {
                    sold.set(j, sold.get(j) + o.getQuantity());
                    revenue.set(j, revenue.get(j) + o.getQuantity() * o.getBook().getPrice());
                    isExists = true;
                    break;
                }
            }
            if (isExists) {

            } else {
                bookList.add(bookList.size(), o.getBook());
                sold.add(sold.size(), o.getQuantity());
                revenue.add(revenue.size(), o.getQuantity()*o.getBook().getPrice());

            }
        }

        for (int i = 0; i < bookList.size(); i++) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("book", bookList.get(i));
            temp.put("sold", sold.get(i));
            temp.put("revenue", revenue.get(i));
            res.add(temp);
        }

        res.sort(new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                return (Integer) o2.get("sold") - (Integer) o1.get("sold");
            }
        });
        if (limit < res.size()) {
            res = res.subList(0, limit);
        }

        return res;
    }

    @Override
    public List<Map<String, Object>> getTopRevenueBook(Date from, Date to, Integer limit) {
        List<Map<String, Object>> res = new ArrayList<>();
        List<BookDTO> bookList = new ArrayList<>();
        List<Integer> sold = new ArrayList<>();
        List<Double> revenue = new ArrayList<>();
        List<OrderDTO> orderList = getOrderBetweenDays(from, to);
        List<OrderDetailDTO> orderDetailList = new ArrayList<>();

        orderList.forEach((order) ->
                order.getOrderDetails().forEach((orderDetail) ->
                        orderDetailList.add(orderDetail)
                ));
        //gán cho giá trị cho biến bookList và sold
        for (int i = 0; i < orderDetailList.size(); i++) {
            OrderDetailDTO o = orderDetailList.get(i);
            boolean isExists = false;
            for (int j = 0; j < bookList.size(); j++) {
                if (bookList.get(j).getId() == o.getBook().getId()) {
                    sold.set(j, sold.get(j) + o.getQuantity());
                    revenue.set(j, revenue.get(j) + o.getQuantity() * o.getBook().getPrice());

                    isExists = true;
                    break;
                }
            }
            if (isExists) {

            } else {
                bookList.add(bookList.size(), o.getBook());
                revenue.add(revenue.size(), o.getQuantity()*o.getBook().getPrice());
                sold.add(sold.size(), o.getQuantity());


            }
        }

        for (int i = 0; i < bookList.size(); i++) {
            Map<String, Object> temp = new HashMap<>();
            temp.put("book", bookList.get(i));
            temp.put("sold", sold.get(i));
            temp.put("revenue", revenue.get(i));
            temp.put("sold", sold.get(i));
            res.add(temp);
        }

        res.sort(new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                if ((Double) o2.get("revenue") - (Double) o1.get("revenue") >= 0) {
                    return 1;
                }
                return -1;
            }
        });
        if (limit < res.size()) {
            res = res.subList(0, limit);
        }

        return res;
    }
}
