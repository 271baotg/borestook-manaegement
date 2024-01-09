package com.example.bookstore_backend.controller;


import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.repository.BookRepository;
import com.example.bookstore_backend.repository.PriceRepository;
import com.example.bookstore_backend.service.BookServiceImpl;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class BookController {

    private final BookServiceImpl bookService;
    private final PriceRepository priceRepository;
    public BookController(BookServiceImpl bookService, BookRepository bookRepository, PriceRepository priceRepository) {
        this.bookService = bookService;
        this.priceRepository = priceRepository;
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

    @PostMapping("books/update-price")
    Price changePrice(@RequestParam("id") Long book_id,@RequestParam("price") double price){
        Price newPrice = new Price(book_id, price);
        return priceRepository.save(newPrice);
    }

    @PostMapping(value = "books/save", consumes = {   "multipart/form-data" })
    Book createBook(@RequestPart("bookData") BookDTO bookDTO,
                    @RequestParam("image") MultipartFile image) {
        return bookService.create(bookDTO, image);
    }


}
