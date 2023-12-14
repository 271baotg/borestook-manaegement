package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.model.User;
import com.example.bookstore_backend.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("users")
    List<User> findAll(){
        return userService.findAll();
    }
    @GetMapping("users/search")
    Optional<User> findUserByQuery(@RequestParam("user") String user){ return userService.findUserByUserName(user);}

}
