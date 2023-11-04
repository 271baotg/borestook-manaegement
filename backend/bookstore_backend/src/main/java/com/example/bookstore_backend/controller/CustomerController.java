package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.model.Customer;
import com.example.bookstore_backend.service.CustomerServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class CustomerController {
    private final CustomerServiceImpl customerService;

    public CustomerController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }

    @GetMapping("customers")
    List<Customer> findAll(){
        return customerService.findAll();
    }
    @PostMapping("customers")
    Optional<Customer> createCustomer(@RequestBody Customer cus){
        return customerService.create(cus);
    }
    @PutMapping("customers")
    Optional<Customer> updateCustomer(@RequestBody Customer cus){
        return customerService.update(cus);
    }
}
