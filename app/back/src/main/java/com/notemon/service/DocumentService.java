package com.notemon.service;

import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.entity.PermissionEntity;
import com.notemon.entity.UserDocumentEntity;
import com.notemon.entity.UserEntity;
import com.notemon.enums.PermissionEnum;
import com.notemon.exception.EntityWithFieldNotFoundException;
import com.notemon.exception.EntityWithIdNotFoundException;
import com.notemon.exception.NotPermissionToAccessDocumentException;
import com.notemon.mapper.DocumentMapper;
import com.notemon.mapper.UserDocumentMapper;
import com.notemon.repository.DocumentRepository;
import com.notemon.repository.PermissionRepository;
import com.notemon.repository.UserDocumentRepository;
import com.notemon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final UserDocumentRepository userDocumentRepository;
    private final PermissionRepository permissionRepository;

    private final DocumentMapper documentMapper;
    private final UserDocumentMapper userDocumentMapper;

    @Transactional
    public MessageResponseDto createNewDocument(UUID userId, DocumentDto documentDto)
            throws EntityWithIdNotFoundException, EntityWithFieldNotFoundException {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(UserEntity.class, userId));

        DocumentEntity documentEntity = documentMapper.dtoToEntity(documentDto);
        documentEntity = documentRepository.save(documentEntity);

        PermissionEntity permissionEntity = permissionRepository.findByCode(PermissionEnum.EDITOR)
                .orElseThrow(() -> new EntityWithFieldNotFoundException(PermissionEntity.class, "code", PermissionEnum.EDITOR.toString()));

        UserDocumentEntity userDocumentEntity = new UserDocumentEntity(
                userEntity,
                documentEntity,
                permissionEntity
        );

        userDocumentRepository.save(userDocumentEntity);

        return new MessageResponseDto("Document created successfully");
    }

    @Transactional
    public Set<DocumentDto> getAllDocuments(UUID userId, UUID parentId, Boolean isDirectory)
            throws EntityWithIdNotFoundException, NotPermissionToAccessDocumentException {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(UserEntity.class, userId));

        Set<DocumentEntity> documentEntities;
        if (isDirectory == null) {
            documentEntities = documentRepository.findAllByParentId(parentId);
        } else {
            documentEntities = documentRepository.findAllByParentIdAndIsDirectory(parentId, Boolean.TRUE.equals(isDirectory));
        }

        return documentEntities
                .stream()
                .filter(documentEntity -> userDocumentRepository.findByUserIdAndDocumentId(userId, documentEntity.getId()).isPresent())
                .map(documentMapper::entityToDto)
                .peek(documentDto -> {
                    UserDocumentEntity relationshipEntity = userDocumentRepository
                            .findByUserIdAndDocumentId(userId, documentDto.getId())
                            .orElse(null);

                    documentDto.setRelationship(userDocumentMapper.entityToDto(relationshipEntity));
                })
                .collect(Collectors.toSet());
    }

}
