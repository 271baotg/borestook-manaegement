package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
        @Query(value = "SELECT * FROM customer WHERE MATCH(name, phone_number) AGAINST(:query IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    public List<Customer> findCustomerByName(@RequestParam("query") String query);

        @Procedure(procedureName = "spCountCreatedCustomerByMonthAndYear")
        Optional<Integer[]> getCustomerCreatedNumberByMonthAndYear(Integer month, Integer year);
}
