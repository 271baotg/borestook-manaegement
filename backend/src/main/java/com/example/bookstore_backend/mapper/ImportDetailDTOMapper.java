package com.example.bookstore_backend.mapper;
import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.dto.ImportDetailDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.ImportDetail;
import com.example.bookstore_backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
public class ImportDetailDTOMapper implements Function<ImportDetail, ImportDetailDTO> {
    private final BookRepository bookRepository;

    public ImportDetailDTOMapper(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @Override
    public ImportDetailDTO apply(ImportDetail importDetail) {

        return ImportDetailDTO.builder()
                .id(importDetail.getId())
                .bookID(importDetail.getBook().getId())
                .unitPrice(importDetail.getUnitPrice())
                .bookName(importDetail.getBook().getTitle())
                .quantity(importDetail.getQuantity())
                .total(importDetail.getQuantity()* importDetail.getUnitPrice())
                .build();

    }

    public ImportDetail mapToImport(ImportDetailDTO importDetailDTO) {
        Book book;
        book = bookRepository.findById(importDetailDTO.getBookID())
                        .orElseThrow(() -> new RuntimeException("Book with ID " + importDetailDTO.getBookID() + " not found"));



        return ImportDetail.builder()
                .quantity(importDetailDTO.getQuantity())
                .book(book)
                .unitPrice(importDetailDTO.getUnitPrice())
                .build();
    }
}
