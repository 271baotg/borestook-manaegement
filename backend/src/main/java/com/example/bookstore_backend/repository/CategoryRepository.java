package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
