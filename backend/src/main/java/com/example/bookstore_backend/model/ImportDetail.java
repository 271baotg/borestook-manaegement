package com.example.bookstore_backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@Table(name = "import_detail")
@Builder
@NoArgsConstructor
public class ImportDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "import_ID")
    private Import anImport;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "book_ID")
    private Book book;

    @Column(name = "unit_price")
    private Double unitPrice;
    @Column(name = "quantity")
    private int quantity;

    @Builder
    public ImportDetail(long id, Import anImport, Book book, Double unitPrice, int quantity) {
        this.id = id;
        this.anImport = anImport;
        this.book = book;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }
}
