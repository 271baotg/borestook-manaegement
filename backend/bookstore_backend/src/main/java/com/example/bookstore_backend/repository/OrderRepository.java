package com.example.bookstore_backend.repository;


import com.example.bookstore_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface OrderRepository extends JpaRepository<Order,Long> {
    public Optional<Order> findById(long id);

    @Procedure(procedureName = "spGetSumByMonthAndYear")
    Optional<Double[]> fetchSumByMonthAndYearSP(Integer month, Integer year);

    @Procedure(procedureName = "spCountCreatedOrderByMonthAndYear")
    Optional<Integer[]> getCreatedOrderNumByMonthYear(Integer month, Integer year);

}
