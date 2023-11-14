package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Order;
import com.example.bookstore_backend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    @Query(value = "SELECT * FROM orderdetail WHERE order_id = :id", nativeQuery = true)
    public List<OrderDetail> findByOrderId(@Param("id") Integer id);
}
