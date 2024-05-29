package com.example.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportDetailDTO {
    private Long id;
    private Long bookID;
    private String bookName;
    private Double unitPrice;
    private int quantity;
    private Double total;
}
