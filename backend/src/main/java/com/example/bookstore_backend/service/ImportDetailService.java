package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.ImportDetail;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImportDetailService {
    List<ImportDetail> getListImportDetailByID(long id);
}
