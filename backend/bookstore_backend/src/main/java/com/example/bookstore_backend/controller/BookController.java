package com.example.bookstore_backend.controller;


import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.service.BookServiceImpl;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    List<BookDTO> findAllBook(){
        return bookService.findAll();
    }

    @GetMapping("books/{id}")
    Optional<BookDTO> findBook(@PathVariable("id") Long id){

        return bookService.Get(id);
    }

    @GetMapping("books/search")
    List<BookDTO> findBookByQuery(@RequestParam("query") String query){
        return bookService.findByQuery(query);
    }

    @PostMapping(value = "books/save", consumes = {   "multipart/form-data" })
    Book createBook(@RequestPart("bookData") BookDTO bookDTO,
                    @RequestParam("image") MultipartFile image) {
        return bookService.create(bookDTO, image);
    }



}
