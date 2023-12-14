package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Import;

import java.util.List;
import java.util.Optional;

public interface ImportService {
    Import create(Import anImport);
    List<Import> findAll();

    Optional<Import> findByID(long id);
}
