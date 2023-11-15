package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.model.PricePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface PriceRepository extends JpaRepository<Price, PricePK> {
    @Query(value = "SELECT * FROM price p " +
            "WHERE p.bookID = :bookId " +
            "AND p.start_date = (SELECT MAX(pp.start_date) FROM price pp WHERE pp.bookID = :bookId)",nativeQuery = true)
    Price findLatestPriceByBookId(long bookId);

    @Query(value = "SELECT * FROM price P" +
           "WHERE P.start_date <= :date ORDER BY P.start_date DESC LIMIT 1", nativeQuery = true)
    Price findLatestPriceByDate(Date date);
}
