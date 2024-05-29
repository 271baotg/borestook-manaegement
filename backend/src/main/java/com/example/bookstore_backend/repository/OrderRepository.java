package com.example.bookstore_backend.repository;


import com.example.bookstore_backend.dto.OrderDTO;
import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface OrderRepository extends JpaRepository<Order,Long> {
    public Optional<Order> findById(long id);

    @Query(value = "SELECT * FROM orders WHERE create_date >= :from AND create_date <= :to", nativeQuery = true)
    public List<Order> findOrderBetweenDays(String from, String to);

    @Procedure(procedureName = "spGetSumByMonthAndYear")
    Optional<Double[]> fetchSumByMonthAndYearSP(Integer month, Integer year);

    @Procedure(procedureName = "spCountCreatedOrderByMonthAndYear")
    Optional<Integer[]> getCreatedOrderNumByMonthYear(Integer month, Integer year);

    @Query("select o from Order o where o.username = ?1")
    List<Order> findOrdersByUsername(String username);

}
