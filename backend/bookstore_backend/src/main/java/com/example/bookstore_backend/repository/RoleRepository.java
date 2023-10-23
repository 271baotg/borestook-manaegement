package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findRoleByName(String name);

}
