package com.example.bookstore_backend.model;

import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class PricePK implements Serializable {

    private long bookID;
    @CreatedDate
    private Date startDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PricePK pricePK)) return false;
        return bookID == pricePK.bookID && Objects.equals(startDate, pricePK.startDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookID, startDate);
    }
}
