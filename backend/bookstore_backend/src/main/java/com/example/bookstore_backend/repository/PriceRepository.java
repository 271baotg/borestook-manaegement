package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.model.PricePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface PriceRepository extends JpaRepository<Price, PricePK> {
    @Query(value = "SELECT * FROM price p " +
            "WHERE p.bookID = :bookId " +
            "AND p.start_date  <= :createDate ORDER BY p.start_date DESC limit 1",nativeQuery = true)
    Price findLatestPriceByDate(long bookId, Date createDate);


}
