package com.example.bookstore_backend.repository;

<<<<<<< HEAD
import com.example.bookstore_backend.model.Order;
=======
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
import com.example.bookstore_backend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

<<<<<<< HEAD
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    @Query(value = "SELECT * FROM orderdetail WHERE order_id = :id", nativeQuery = true)
    public List<OrderDetail> findByOrderId(@Param("id") Integer id);
}
=======
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    @Query(value = "SELECT * FROM orderdetail WHERE order_id = :id", nativeQuery = true)
    public List<OrderDetail> findByOrderId(@Param("id") Long id);
}
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
