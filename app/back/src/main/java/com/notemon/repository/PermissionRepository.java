package com.notemon.repository;

import com.notemon.entity.PermissionEntity;
import com.notemon.enums.PermissionEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PermissionRepository
        extends JpaRepository<PermissionEntity, UUID> {
    Optional<PermissionEntity> findByCode(PermissionEnum code);
}
