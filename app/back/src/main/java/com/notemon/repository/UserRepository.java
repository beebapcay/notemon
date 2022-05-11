package com.notemon.repository;

import com.notemon.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository
        extends JpaRepository<UserEntity, UUID>, QuerydslPredicateExecutor<UserEntity> {
    Optional<UserEntity> findByEmail(String email);
}

