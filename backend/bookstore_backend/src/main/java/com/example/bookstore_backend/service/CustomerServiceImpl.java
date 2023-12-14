package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;
import com.example.bookstore_backend.repository.CustomerRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{
    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(int id) {
        return customerRepository.findById(id);
    }

    @Override
    public Optional<Customer> create(Customer cus) {
        return Optional.of(customerRepository.save(cus));
    }

    @Override
    public void deleted(int id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Optional<Customer> update(Customer cus) {
        return Optional.of(customerRepository.saveAndFlush(cus));
    }

    @Override
    public List<Customer> findCustomerByQuery(String query) {
        return customerRepository.findCustomerByName(query);
    }

    @Override
    public Map<String, Object> getCustomerCreatedNumberByMonthAndYear(Integer month, Integer year) {
        Map<String, Object> res = new HashMap<>();
        Integer count = customerRepository.getCustomerCreatedNumberByMonthAndYear(month, year).get()[0];

        res.put("month", month);
        res.put("year", year);
        res.put("count", count);

        return res;
    }
}
