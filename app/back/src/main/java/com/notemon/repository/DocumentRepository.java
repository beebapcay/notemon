package com.notemon.repository;

import com.notemon.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
@SuppressWarnings("SpringDataMethodInconsistencyInspection")
public interface DocumentRepository
        extends JpaRepository<DocumentEntity, UUID> {
    Set<DocumentEntity> findAllByIdIsIn(Collection<UUID> ids);

    Set<DocumentEntity> findAllByParentIdAndIsDirectory(UUID parentId, boolean isDirectory);

    Set<DocumentEntity> findAllByParentId(UUID parentId);

    Set<DocumentEntity> findAllByParentIdAndIsDirectoryFalse(UUID parentId);

    Set<DocumentEntity> findAllByParentIdAndIsDirectoryIsTrue(UUID parentId);

    Optional<DocumentEntity> findByShareCode(String shareCode);
}
