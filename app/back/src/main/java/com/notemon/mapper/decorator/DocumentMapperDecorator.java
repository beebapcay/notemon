package com.notemon.mapper.decorator;

import com.notemon.dto.DocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.entity.UserEntity;
import com.notemon.mapper.DocumentMapper;
import com.notemon.repository.DocumentRepository;
import com.notemon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Set;

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
        if (dto.getParent() != null) {
            DocumentEntity parent = documentRepository.findById(dto.getParent()).orElse(null);
            entity.setParent(parent);
        }

        if (dto.getChildren() != null) {
            Set<DocumentEntity> children = documentRepository.findAllByIdIsIn(dto.getChildren());
            entity.setChildren(children);
        }

        if (dto.getAuthor() != null) {
            UserEntity authorEntity = userRepository.findById(dto.getAuthor().getId()).orElse(null);
            entity.setAuthor(authorEntity);
        }
    }
}
