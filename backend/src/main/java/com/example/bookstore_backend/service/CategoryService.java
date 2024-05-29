package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Category;
import com.example.bookstore_backend.repository.CategoryRepository;

import java.util.List;

public interface CategoryService {
    public List<Category> findAll();
}
