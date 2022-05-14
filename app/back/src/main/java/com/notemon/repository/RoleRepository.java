package com.notemon.repository;

import com.notemon.entity.RoleEntity;
import com.notemon.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository
        extends JpaRepository<RoleEntity, UUID> {
    Optional<RoleEntity> findByName(RoleEnum name);
}
