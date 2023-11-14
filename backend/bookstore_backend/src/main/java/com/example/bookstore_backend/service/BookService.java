package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;

import java.util.List;

public interface BookService {
    List<BookDTO> findAll();
    Book create(BookDTO book);
    Book update(BookDTO book);

    void deleteById(Long id);
    List<BookDTO> findByQuery(String query);

}
