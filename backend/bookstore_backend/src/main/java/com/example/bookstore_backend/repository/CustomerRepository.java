package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {


}
