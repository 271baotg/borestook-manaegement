package com.example.bookstore_backend.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "import")
@Builder
@NoArgsConstructor
public class Import {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "create_date")
    private Date create_date;
    @Column(name = "provider")
    private String provider;
    @Column(name = "total")
    private Double total;

    @JsonManagedReference
    @OneToMany(mappedBy = "anImport", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ImportDetail> detailList;

    @Builder
    public Import(long id, Date create_date, String provider, Double total, List<ImportDetail> detailList) {
        this.id = id;
        this.create_date = create_date;
        this.provider = provider;
        this.total = total;
        this.detailList = detailList;
    }
}
