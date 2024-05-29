package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.ImportDTO;
import com.example.bookstore_backend.model.Import;

import java.util.List;
import java.util.Optional;

public interface ImportService {
    Import create(ImportDTO anImport);
    List<ImportDTO> findAll();

    Optional<Import> findByID(long id);
}
