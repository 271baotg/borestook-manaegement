package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface BookRepository extends JpaRepository<Book,Long> {
    public Optional<Book> findById(Long id);


    @Query(value = "SELECT * FROM book where match(title) against(:query in natural language mode)", nativeQuery = true)
    public List<Book> findBookByTitle(String query);
}
