package com.example.bookstore_backend.mapper;

import com.example.bookstore_backend.dto.BookDTO;
import com.example.bookstore_backend.model.Book;
import com.example.bookstore_backend.model.Price;
import com.example.bookstore_backend.repository.PriceRepository;
import org.springframework.stereotype.Service;

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
        if(priceRepository.findLatestPriceByBookId(book.getId()).isPresent())
        {
            price = priceRepository.findLatestPriceByBookId(book.getId()).get().getPrice();
        }
        else price = 0.0;


        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getAvailable(),
                book.getCategory(),
                book.getImg(),
                price
        );
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
