package com.notemon.mapper.annotation;

import org.mapstruct.Mapping;

@Mapping(target = "userLogInserted", ignore = true)
@Mapping(target = "userLogUpdated", ignore = true)
@Mapping(target = "dateLogInserted", ignore = true)
@Mapping(target = "dateLogUpdated", ignore = true)
public @interface IgnoreAuditMapping {
}
