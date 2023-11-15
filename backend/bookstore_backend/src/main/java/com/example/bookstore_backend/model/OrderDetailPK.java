package com.example.bookstore_backend.model;

import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class OrderDetailPK implements Serializable {
    private Order order;
    private Book book;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetailPK that = (OrderDetailPK) o;
        return Objects.equals(order, that.order) && Objects.equals(book, that.book);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, book);
    }
}
