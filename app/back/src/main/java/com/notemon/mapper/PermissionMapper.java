package com.notemon.mapper;

import com.notemon.dto.PermissionDto;
import com.notemon.entity.PermissionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    PermissionDto entityToDto(PermissionEntity permission);
}
