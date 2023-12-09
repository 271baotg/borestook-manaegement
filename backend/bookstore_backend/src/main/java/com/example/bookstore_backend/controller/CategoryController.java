package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.model.Category;
import com.example.bookstore_backend.service.CategoryService;
import com.example.bookstore_backend.service.CategoryServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@Controller
@RestController
public class CategoryController {

    CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("category")
    public List<Category> findAllBook(){
        return categoryService.findAll();
    }
}
