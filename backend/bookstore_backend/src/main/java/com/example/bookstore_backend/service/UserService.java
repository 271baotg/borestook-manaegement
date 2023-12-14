package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);

    void deleted(Long id);
    Optional<User> findUserByUserName(String UserName);
}
