package com.notemon.repository;

import com.notemon.entity.UserDocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserDocumentRepository
        extends JpaRepository<UserDocumentEntity, UUID> {

}
