package com.notemon.service;

import com.notemon.dto.DocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.entity.PermissionEntity;
import com.notemon.entity.UserDocumentEntity;
import com.notemon.entity.UserEntity;
import com.notemon.exception.AppBusinessException;
import com.notemon.exception.EntityNotFoundException;
import com.notemon.mapper.DocumentMapper;
import com.notemon.repository.DocumentRepository;
import com.notemon.repository.PermissionRepository;
import com.notemon.repository.UserDocumentRepository;
import com.notemon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final UserDocumentRepository userDocumentRepository;
    private final PermissionRepository permissionRepository;

    private final DocumentMapper documentMapper;

    @Transactional
    public DocumentDto createNewDocument(UUID userId, DocumentDto documentDto) throws EntityNotFoundException, AppBusinessException {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(UserEntity.class, userId));

        DocumentEntity documentEntity = documentMapper.dtoToEntity(documentDto);
        documentEntity = documentRepository.save(documentEntity);

        PermissionEntity permissionEntity = permissionRepository.findById(UUID.fromString("a1a6046d-3593-4e67-8b82-6ec30d47591a"))
                .orElseThrow(() -> new AppBusinessException("Internal: Permission not found"));

        UserDocumentEntity userDocumentEntity = new UserDocumentEntity(
                userEntity,
                documentEntity,
                permissionEntity
        );

        userDocumentRepository.save(userDocumentEntity);

        return documentMapper.entityToDto(documentEntity);
    }
}
