package com.notemon.mapper.decorator;

import com.notemon.dto.DocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.entity.UserEntity;
import com.notemon.mapper.DocumentMapper;
import com.notemon.repository.DocumentRepository;
import com.notemon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public abstract class DocumentMapperDecorator implements DocumentMapper {

    @Autowired
    @Qualifier("delegate")
    private DocumentMapper delegate;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

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
        Set<UUID> documentDtoIds = new HashSet<>();
        if (dto.getParent() != null) {
            documentDtoIds.add(dto.getParent());
        }
        if (dto.getChildren() != null) {
            documentDtoIds.addAll(dto.getChildren());
        }

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

        if (dto.getAuthor() != null) {
            UserEntity authorEntity = userRepository.findById(dto.getAuthor().getId()).orElse(null);
            entity.setAuthor(authorEntity);
        }
    }

}
