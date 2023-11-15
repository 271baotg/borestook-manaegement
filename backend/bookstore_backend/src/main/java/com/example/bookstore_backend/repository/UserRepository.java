package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
     Optional<User> findUsersByUsername(String username);
}
