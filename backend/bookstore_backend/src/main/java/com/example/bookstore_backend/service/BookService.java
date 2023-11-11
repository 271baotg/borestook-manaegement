package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Book;

import java.util.List;

public interface BookService {
    List<Book> findAll();
    Book create(Book book);
    Book update(Book book);
    void deleteById(int id);


    List<Book> findBookByQuery(String query);
}
