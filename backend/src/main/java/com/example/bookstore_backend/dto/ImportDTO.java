package com.example.bookstore_backend.dto;


import com.example.bookstore_backend.model.ImportDetail;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportDTO {

    private long id;
    private Date create_date;
    private String provider;
    private Double total;
    private List<ImportDetailDTO> detailList;
}
