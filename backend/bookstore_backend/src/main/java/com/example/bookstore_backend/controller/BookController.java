package com.example.bookstore_backend.controller;


import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.service.BookServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("bookdetail/{id}")
    Optional<Book> findBook(@PathVariable("id") Integer id){
        return bookService.Get(id);
    }

}
