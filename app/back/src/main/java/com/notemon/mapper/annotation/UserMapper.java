package com.notemon.mapper.annotation;

import com.notemon.dto.UserDto;
import com.notemon.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto entityToDto(UserEntity user);
}
