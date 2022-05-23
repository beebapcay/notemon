package com.notemon.repository;

import com.notemon.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface UserRepository
        extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    Set<UserEntity> findAllByEnableTrue();

    Optional<UserEntity> findByRefreshToken(String refreshToken);
}

