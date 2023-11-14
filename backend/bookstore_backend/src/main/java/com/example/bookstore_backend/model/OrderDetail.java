package com.example.bookstore_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
=======
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
import java.util.List;
import java.util.Set;
=======
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215

@Entity
@Data
@NoArgsConstructor
<<<<<<< HEAD
@Table(name = "orderdetail")
=======
@Table(name = "order_detail")
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
<<<<<<< HEAD
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "book_id")
=======
    @JoinColumn(name = "order_ID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "book_ID")
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
    private Book book;

    @Column(name = "quantity")
    private int quantity;


<<<<<<< HEAD
}
=======
}
>>>>>>> eaee5ca9fddbc7652b7419371babb32ec84e7215
