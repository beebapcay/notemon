package com.notemon.repository;

import com.notemon.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;

@Repository
public interface DocumentRepository
        extends JpaRepository<DocumentEntity, UUID> {
    Set<DocumentEntity> findAllByIdIsIn(Collection<UUID> ids);
}
