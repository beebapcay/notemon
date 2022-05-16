package com.notemon.mapper;

import com.notemon.dto.UserDocumentDto;
import com.notemon.entity.UserDocumentEntity;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses = {
                DocumentMapper.class,
                UserMapper.class,
                PermissionMapper.class
        }
)
public interface UserDocumentMapper {
    UserDocumentDto entityToDto(UserDocumentEntity userDocument);
}
