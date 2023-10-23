package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Integer> {
    public Optional<Book> findById(Integer id);
}
