package com.notemon.service.impl;

import com.notemon.dto.UserDto;
import com.notemon.entity.UserEntity;
import com.notemon.exception.EntityNotFoundException;
import com.notemon.mapper.annotation.UserMapper;
import com.notemon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto getUserById(UUID id) throws EntityNotFoundException {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(UserEntity.class, id));
        return userMapper.entityToDto(userEntity);
    }
}
