package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Customer;
import com.example.bookstore_backend.repository.CustomerRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{

    private final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public List<Customer> findAll() {
        String username = null;
        try {
            // Retrieve the username of the currently authenticated user
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else {
                username = principal.toString();
            }
//            logger.info("User {}: findAll Customer Successfully", username);
        } catch (Exception e) {
//            logger.error("Error retrieving username for findAll Customer: {}", e.getMessage(), e);
//            username = "unknown";
        }
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(int id) {
        return customerRepository.findById(id);
    }

    @Override
    public Optional<Customer> create(Customer cus) {
        String username = null;
        try {
            // Retrieve the username of the currently authenticated user
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else {
                username = principal.toString();
            }

            Optional<Customer> savedCustomer = Optional.of(customerRepository.save(cus));
            logger.info("User {} created a customer with ID {}", username, savedCustomer.get().getId());
            return savedCustomer;
        } catch (Exception e) {
            logger.error("Failed to create Customer by user {}: {}", username, e.getMessage(), e);
            throw e; // Optionally rethrow the exception or handle it as needed
        }
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
