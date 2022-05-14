package com.notemon.mapper.decorator;

import com.notemon.dto.DocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.mapper.DocumentMapper;
import com.notemon.repository.DocumentRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public abstract class DocumentMapperDecorator implements DocumentMapper {

    @Autowired
    @Qualifier("delegate")
    private DocumentMapper delegate;

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public DocumentEntity dtoToEntity(DocumentDto document) {
        DocumentEntity documentEntityMapped = delegate.dtoToEntity(document);

        if (document == null) {
            return null;
        }

        mapRelationsFromDocumentDto(documentEntityMapped, document);

        return documentEntityMapped;
    }

    private void mapRelationsFromDocumentDto(DocumentEntity entity, DocumentDto dto) {
        Set<UUID> documentDtoIds = Stream.of(dto.getParent(), dto.getChildren())
                .filter(Objects::nonNull)
                .map(Objects::toString)
                .filter(StringUtils::isNotEmpty)
                .map(UUID::fromString)
                .collect(Collectors.toSet());

        Set<DocumentEntity> documentEntities = documentRepository.findAllByIdIsIn(documentDtoIds);

        entity.setParent(documentEntities
                .stream()
                .filter(documentEntity -> documentEntity.getId().equals(dto.getParent()))
                .findFirst()
                .orElse(null)
        );

        entity.setChildren(documentEntities
                .stream()
                .filter(documentEntity -> dto.getChildren().contains(documentEntity.getId()))
                .collect(Collectors.toSet())
        );
    }

}
