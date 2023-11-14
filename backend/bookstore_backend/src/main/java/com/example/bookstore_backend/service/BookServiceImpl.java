package com.example.bookstore_backend.service;


import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.mapper.BookDTOMapper;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.repository.BookRepository;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService{


    private final BookRepository bookRepository;
    private BookDTOMapper bookDTOMapper;
    public BookServiceImpl(BookRepository bookRepository, BookDTOMapper bookDTOMapper) {
        this.bookRepository = bookRepository;
        this.bookDTOMapper = bookDTOMapper;
    }


    @Override
    public List<BookDTO> findAll() {
        return bookRepository
                .findAll()
                .stream()
                .map(bookDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public Book create(BookDTO bookDTO) {
        Book book = bookDTOMapper.mapToBook(bookDTO);
        return bookRepository.save(book);
    }

    @Override
    public Book update(BookDTO bookDTO) {
        Book book = bookDTOMapper.mapToBook(bookDTO);
        return bookRepository.save(book);
    }

    @Override
    public void deleteById(Long id) {
         bookRepository.deleteById(id);

    }

    @Override
    public List<BookDTO> findByQuery(String query) {
        return bookRepository.findBookByTitle(query)
                .stream()
                .map(bookDTOMapper)
                .collect(Collectors.toList());
    }

    public Optional<BookDTO> Get(Long id){
        Optional<Book> bookOptional = bookRepository.findById(id);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            BookDTO bookDTO = bookDTOMapper.apply(book);
            return Optional.of(bookDTO);
        } else {
            return Optional.empty();
        }
    }

}
