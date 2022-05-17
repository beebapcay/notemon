package com.notemon.service;

import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.dto.UserDocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.entity.PermissionEntity;
import com.notemon.entity.UserDocumentEntity;
import com.notemon.entity.UserEntity;
import com.notemon.enums.PermissionEnum;
import com.notemon.exception.*;
import com.notemon.mapper.DocumentMapper;
import com.notemon.mapper.UserDocumentMapper;
import com.notemon.repository.DocumentRepository;
import com.notemon.repository.PermissionRepository;
import com.notemon.repository.UserDocumentRepository;
import com.notemon.repository.UserRepository;
import com.notemon.utils.RandomCodeUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
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
    public DocumentDto createNewDocument(UUID userId, DocumentDto documentDto)
            throws EntityWithIdNotFoundException, EntityWithFieldNotFoundException {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(UserEntity.class, userId));

        DocumentEntity documentEntity = documentMapper.dtoToEntity(documentDto);
        documentEntity.setShareCode(RandomCodeUtils.generateShareCode());
        documentEntity = documentRepository.save(documentEntity);

        PermissionEntity permissionEntity = permissionRepository.findByCode(PermissionEnum.EDITOR)
                .orElseThrow(() -> new EntityWithFieldNotFoundException(PermissionEntity.class, "code", PermissionEnum.EDITOR.toString()));

        UserDocumentEntity userDocumentEntity = new UserDocumentEntity(
                userEntity,
                documentEntity,
                permissionEntity
        );

        userDocumentRepository.save(userDocumentEntity);

        return documentMapper.entityToDto(documentEntity);
    }

    @Transactional
    public Set<DocumentDto> getAllDocuments(UUID userId, UUID parentId, Boolean isDirectory)
            throws EntityWithIdNotFoundException, NotPermissionToAccessDocumentException {
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

    @Transactional
    public DocumentDto updateNameDocument(UUID documentId, UUID userId, DocumentDto documentDto)
            throws
            EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException,
            NotPermissionToEditDocumentException {
        DocumentEntity documentEntity = documentRepository.findById(documentId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(DocumentEntity.class, documentId));

        UserDocumentEntity userDocumentEntity = userDocumentRepository.findByUserIdAndDocumentId(userId, documentId)
                .orElseThrow(() -> new NotPermissionToAccessDocumentException(userId, documentId));

        if (userDocumentEntity.getPermission().getCode().equals(PermissionEnum.EDITOR)) {
            documentEntity.setName(documentDto.getName());
            documentRepository.save(documentEntity);
        } else {
            throw new NotPermissionToEditDocumentException(userId, documentId);
        }

        return documentMapper.entityToDto(documentEntity);
    }

    @Transactional
    public DocumentDto updateStarredDocument(UUID documentId, UUID userId, UserDocumentDto userDocumentDto)
            throws
            EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException {
        DocumentEntity documentEntity = documentRepository.findById(documentId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(DocumentEntity.class, documentId));

        UserDocumentEntity userDocumentEntity = userDocumentRepository.findByUserIdAndDocumentId(userId, documentId)
                .orElseThrow(() -> new NotPermissionToAccessDocumentException(userId, documentId));

        userDocumentEntity.setStarred(userDocumentDto.isStarred());
        documentRepository.save(documentEntity);

        return documentMapper.entityToDto(documentEntity);
    }

    @Transactional
    public UserDocumentDto addPartnerToDocument(UUID documentId, UserDocumentDto relationship)
            throws
            EntityWithIdNotFoundException,
            EntityWithFieldNotFoundException,
            UserAlreadyInRelationshipWithDocumentException {
        DocumentEntity documentEntity = documentRepository.findById(relationship.getDocument().getId())
                .orElseThrow(() -> new EntityWithIdNotFoundException(DocumentEntity.class, documentId));

        UUID partnerId = relationship.getUser().getId();
        UserEntity partnerEntity = userRepository.findById(partnerId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(UserEntity.class, partnerId));

        Optional<UserDocumentEntity> userDocumentEntity = userDocumentRepository.findByUserIdAndDocumentId(partnerId, documentEntity.getId());
        if (userDocumentEntity.isPresent()) {
            throw new UserAlreadyInRelationshipWithDocumentException(documentEntity.getId(), partnerId);
        } else {
            UserDocumentEntity userDocument = new UserDocumentEntity();
            userDocument.setDocument(documentEntity);
            userDocument.setUser(partnerEntity);

            PermissionEntity permission = permissionRepository.findByCode(PermissionEnum.EDITOR)
                    .orElseThrow(() -> new EntityWithFieldNotFoundException(PermissionEntity.class, "Code", PermissionEnum.EDITOR.toString()));

            userDocument.setPermission(permission);

            UserDocumentEntity savedRelationshipEntity = userDocumentRepository.save(userDocument);

            return userDocumentMapper.entityToDto(savedRelationshipEntity);
        }
    }

    @Transactional
    public MessageResponseDto deleteDocument(UUID documentId, UUID userId)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException {
        DocumentEntity documentEntity = documentRepository.findById(documentId)
                .orElseThrow(() -> new EntityWithIdNotFoundException(DocumentEntity.class, documentId));

        UserDocumentEntity userDocumentEntity = userDocumentRepository.findByUserIdAndDocumentId(userId, documentId)
                .orElseThrow(() -> new NotPermissionToAccessDocumentException(userId, documentId));

        userDocumentRepository.delete(userDocumentEntity);

        if (!userDocumentRepository.existsByDocumentId(documentId)) {
            documentRepository.delete(documentEntity);
        }

        return new MessageResponseDto("Document deleted successfully");
    }
}
