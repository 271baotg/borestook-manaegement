package com.example.bookstore_backend.mapper;

import com.example.bookstore_backend.dto.ImportDTO;
import com.example.bookstore_backend.dto.ImportDetailDTO;
import com.example.bookstore_backend.model.Import;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ImportDTOMapper implements Function<Import, ImportDTO> {
    private final ImportDetailDTOMapper importDetailDTOMapper;

    public ImportDTOMapper(ImportDetailDTOMapper importDetailDTOMapper) {
        this.importDetailDTOMapper = importDetailDTOMapper;
    }


    @Override
    public ImportDTO apply(Import anImport) {
        List<ImportDetailDTO>  detailDTOList= anImport.getDetailList().stream()
                .map(importDetailDTOMapper)
                .collect(Collectors.toList());

        return ImportDTO.builder()
                .id(anImport.getId())
                .create_date(anImport.getCreate_date())
                .provider(anImport.getProvider())
                .detailList(detailDTOList)
                .total(anImport.getTotal())
                .build();
    }
}
