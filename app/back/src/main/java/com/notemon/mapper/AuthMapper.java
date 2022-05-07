package com.notemon.mapper;

import com.notemon.dto.LoginResponseJwtDto;
import com.notemon.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    LoginResponseJwtDto loginResponseJwtDto(UserEntity userEntity);
}
