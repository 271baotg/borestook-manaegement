package com.example.bookstore_backend.service;


import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{


    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book create(Book book) {
        book.setId(0);
        return bookRepository.save(book);
    }

    @Override
    public Book update(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteById(int id) {
         bookRepository.deleteById(id);

    }

    public Optional<Book> Get(Integer id){
        return bookRepository.findById(id);
    }

}
