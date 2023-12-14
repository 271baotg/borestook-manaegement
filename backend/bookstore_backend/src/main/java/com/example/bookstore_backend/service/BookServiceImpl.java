package com.example.bookstore_backend.service;


import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.mapper.BookDTOMapper;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.repository.BookRepository;
import com.example.bookstore_backend.repository.PriceRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService{

    private final PriceRepository priceRepository;
    private final BookRepository bookRepository;
    private BookDTOMapper bookDTOMapper;
    public BookServiceImpl(PriceRepository priceRepository, BookRepository bookRepository, BookDTOMapper bookDTOMapper) {
        this.priceRepository = priceRepository;
        this.bookRepository = bookRepository;
        this.bookDTOMapper = bookDTOMapper;
    }


    @Override
    public List<BookDTO> findAll() {
        return bookRepository
                .findAll()
                .stream()
                .map(bookDTOMapper)
                .peek(bookDTO -> {
                        Price latestPrice = priceRepository.findLatestPriceByDate(bookDTO.getId(), Date.from(Instant.now()));
                        bookDTO.setPrice(latestPrice.getPrice());
                    }
                )
                .collect(Collectors.toList());
    }

    @Override
    public Book create(BookDTO bookDTO) {
        Book book = bookDTOMapper.mapToBook(bookDTO);
        Book savedBook = bookRepository.save(book);
        Price price = new Price(savedBook.getId(),bookDTO.getPrice());
        priceRepository.save(price);
        return savedBook;
    }

    @Override
    public Book update(Book book) {
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

    @Override
    public Optional<Book> findById(long id) {

            if(bookRepository.findById(id).isPresent())
                return Optional.of(bookRepository.findById(id).get());
            else return Optional.empty();
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
