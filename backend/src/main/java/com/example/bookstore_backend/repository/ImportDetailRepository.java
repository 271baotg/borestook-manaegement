package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.ImportDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImportDetailRepository extends JpaRepository<ImportDetail,Long> {

    @Query(value = "SELECT * FROM import_detail WHERE import_ID = :id", nativeQuery = true)
    List<ImportDetail> getListImportDetailByID(@Param(value = "id") long id);
}
