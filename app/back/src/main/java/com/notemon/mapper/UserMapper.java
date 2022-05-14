package com.notemon.mapper;

import com.notemon.dto.UserDto;
import com.notemon.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface UserMapper {
    public static final String ENTITY_TO_UUID_MAPPING = "entityToUuidMapping";

    UserDto entityToDto(UserEntity user);

    @Named("entityToUuidMapping")
    public static UUID entityToUUID(UserEntity user) {
        return user.getId();
    }
}
