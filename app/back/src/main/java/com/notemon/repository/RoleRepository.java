package com.notemon.repository;

import com.notemon.entity.RoleEntity;
import com.notemon.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoleRepository
        extends JpaRepository<RoleEntity, UUID> {
    Optional<RoleEntity> findByName(RoleEnum name);
}
