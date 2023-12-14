package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.model.Import;
import com.example.bookstore_backend.model.ImportDetail;
import com.example.bookstore_backend.repository.ImportDetailRepository;
import com.example.bookstore_backend.service.ImportDetailService;
import com.example.bookstore_backend.service.ImportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ImportController {

    private final ImportService importService;

    private final ImportDetailService importDetailService;

    public ImportController(ImportService importService, ImportDetailService importDetailService) {
        this.importService = importService;
        this.importDetailService = importDetailService;
    }

    @GetMapping("imports")
    List<Import> findAllImport(){
        return importService.findAll();
    }

    @GetMapping("imports/{id}")
    List<ImportDetail> findDetailByID(@PathVariable(name = "id") long id){
        return importDetailService.getListImportDetailByID(id);
    }

    @PostMapping("imports")
    Import createImport(@RequestBody Import anImport){
        return importService.create(anImport);
    }
}
