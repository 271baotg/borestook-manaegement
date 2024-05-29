package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.ImportDetail;
import com.example.bookstore_backend.repository.ImportDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ImportDetailServiceImpl implements ImportDetailService{

    private ImportDetailRepository importDetailRepository;

    public ImportDetailServiceImpl(ImportDetailRepository importDetailRepository) {
        this.importDetailRepository = importDetailRepository;
    }

    @Override
    public List<ImportDetail> getListImportDetailByID(long id) {
        return importDetailRepository.getListImportDetailByID(id);
    }
}
