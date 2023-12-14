package com.example.bookstore_backend.service;

import com.example.bookstore_backend.dto.ImportDTO;
import com.example.bookstore_backend.mapper.ImportDTOMapper;
import com.example.bookstore_backend.mapper.ImportDetailDTOMapper;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Import;
import com.example.bookstore_backend.model.ImportDetail;
import com.example.bookstore_backend.repository.ImportRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImportServiceImpl implements ImportService{
    private final ImportRepository importRepository;
    private final BookService bookService;
    private final ImportDTOMapper importDTOMapper;

    private final ImportDetailDTOMapper importDetailDTOMapper;

    public ImportServiceImpl(ImportRepository importRepository, BookService bookService, ImportDTOMapper importDTOMapper, ImportDetailDTOMapper importDetailDTOMapper) {
        this.importRepository = importRepository;
        this.bookService = bookService;
        this.importDTOMapper = importDTOMapper;
        this.importDetailDTOMapper = importDetailDTOMapper;
    }

    @Override
    public Import create(ImportDTO anImport) {
       List<ImportDetail> detailList = anImport.getDetailList().stream().map(importDetailDTO -> {
            long bookId = importDetailDTO.getBookID();
            Book optionalBook = bookService.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book with ID " + bookId + " not found"));
            int newAvailable = optionalBook.getAvailable() + importDetailDTO.getQuantity();
            optionalBook.setAvailable(newAvailable);
            Book updatedBook = bookService.update(optionalBook);
            return importDetailDTOMapper.mapToImport(importDetailDTO);


        }).collect(Collectors.toList());
        System.out.println(Date.from(Instant.now()));
        Import newImport = Import.builder()
                .total(anImport.getTotal())
                .create_date(Date.from(Instant.now()))
                .detailList(detailList)
                .provider(anImport.getProvider())
                .build();
        return importRepository.save(newImport);
    }

    @Override
    public List<ImportDTO> findAll() {
        return importRepository.findAll().stream()
                .map(importDTOMapper)
                .toList();
    }

    @Override
    public Optional<Import> findByID(long id) {
        if(importRepository.findById(id).isPresent())
            return Optional.of(importRepository.findById(id).get());
        else return Optional.empty();
    }


}
