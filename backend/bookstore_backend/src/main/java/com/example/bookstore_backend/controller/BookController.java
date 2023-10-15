package com.example.bookstore_backend.controller;


import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.service.BookServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class BookController {

    private final BookServiceImpl bookService;

    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping("books")
    List<Book> findAllBook(){
        return bookService.findAll();
    }
}
