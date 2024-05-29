package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Import;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportRepository extends JpaRepository<Import, Long> {
}
