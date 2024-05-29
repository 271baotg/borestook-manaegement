package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;

import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface CustomerService {
    List<Customer> findAll();
    Optional<Customer> findById(int id);
    Optional<Customer> create(Customer cus);
    void deleted(int id);
    Optional<Customer> update(Customer cus);
    List<Customer> findCustomerByQuery(String query);

    Map<String, Object> getCustomerCreatedNumberByMonthAndYear(Integer month, Integer year);
}
