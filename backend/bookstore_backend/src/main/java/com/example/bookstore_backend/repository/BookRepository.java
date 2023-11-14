package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
    public Optional<Book> findById(Integer id);

    @Query("select b from Book b where b.id = ?1")
    public List<Book> findOrderDetailId(Integer id);
}
