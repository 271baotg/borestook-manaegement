package com.example.bookstore_backend.service;

import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Import;
import com.example.bookstore_backend.repository.ImportRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImportServiceImpl implements ImportService{
    private final ImportRepository importRepository;
    private final BookService bookService;

    public ImportServiceImpl(ImportRepository importRepository, BookService bookService) {
        this.importRepository = importRepository;
        this.bookService = bookService;
    }

    @Override
    public Import create(Import anImport) {
        anImport.getDetailList().stream().map(importDetail -> {
            long bookId = importDetail.getBook().getId();
            Book optionalBook = bookService.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book with ID " + bookId + " not found"));
            int newAvailable = optionalBook.getAvailable() + importDetail.getQuantity();
            optionalBook.setAvailable(newAvailable);
            Book updatedBook = bookService.update(optionalBook);
            importDetail.setBook(updatedBook);
            return importDetail;

        }).collect(Collectors.toList());
        return importRepository.save(anImport);
    }

    @Override
    public List<Import> findAll() {
        return importRepository.findAll();
    }

    @Override
    public Optional<Import> findByID(long id) {
        if(importRepository.findById(id).isPresent())
            return Optional.of(importRepository.findById(id).get());
        else return Optional.empty();
    }


}
