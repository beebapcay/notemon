package com.notemon.mapper;

import com.notemon.dto.DocumentDto;
import com.notemon.entity.DocumentEntity;
import com.notemon.mapper.annotation.IgnoreAuditMapping;
import com.notemon.mapper.decorator.DocumentMapperDecorator;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(
        componentModel = "spring",
        uses = {UserMapper.class}
)
@DecoratedWith(DocumentMapperDecorator.class)
public interface DocumentMapper {
    public static String ENTITY_TO_UUID_MAPPING = "entityToUuidMapping";
    public static String SET_ENTITY_TO_SET_UUID_MAPPING = "setEntityToSetUuidMapping";

    @Mapping(source = "parent", target = "parent", qualifiedByName = ENTITY_TO_UUID_MAPPING)
    @Mapping(source = "children", target = "children", qualifiedByName = SET_ENTITY_TO_SET_UUID_MAPPING)
    @Mapping(target = "relationship", ignore = true)
    DocumentDto entityToDto(DocumentEntity document);

    @IgnoreAuditMapping
    @Mapping(target = "parent", ignore = true)
    @Mapping(target = "children", ignore = true)
    @Mapping(target = "author", ignore = true)
    DocumentEntity dtoToEntity(DocumentDto document);

    @Named(DocumentMapper.ENTITY_TO_UUID_MAPPING)
    public static UUID entityToUuid(DocumentEntity document) {
        return Optional.ofNullable(document).map(DocumentEntity::getId).orElse(null);
    }

    @Named(DocumentMapper.SET_ENTITY_TO_SET_UUID_MAPPING)
    public static Set<UUID> setEntityToSetUuid(Set<DocumentEntity> documents) {
        return documents.stream().map(DocumentMapper::entityToUuid).collect(Collectors.toSet());
    }
}
