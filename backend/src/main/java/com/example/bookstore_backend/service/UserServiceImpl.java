package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.User;
import com.example.bookstore_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleted(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public Optional<User> findUserByUserName(String userName) {
        return userRepository.findUsersByUsername(userName);
    }
}
