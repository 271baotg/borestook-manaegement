package com.example.bookstore_backend.mapper;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.repository.PriceRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.function.Function;

@Service
public class BookDTOMapper implements Function<Book, BookDTO> {
    private PriceRepository priceRepository;

    public BookDTOMapper(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public BookDTO apply(Book book) {
        Double price;

        price = priceRepository.findLatestPriceByDate(book.getId(), Date.from(Instant.now())).getPrice();



        BookDTO result = BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .available(book.getAvailable())
                .img(book.getImg())
                .description(book.getDescription())
                .price(price)
                .build();
        return result;

    }

    //Reverse Mapping
    public Book mapToBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setId(bookDTO.getId());
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setAvailable(bookDTO.getAvailable());
        book.setCategory(bookDTO.getCategory());
        book.setImg(bookDTO.getImg());
        return book;
    }
}
