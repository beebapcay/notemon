package com.notemon.exception;

import java.util.UUID;

public class EntityNotFoundException extends AppBusinessException {
    private static final String MESSAGE_PATTERN = "Entity %s with id %s is not found";

    public EntityNotFoundException(Class<?> clazz, UUID id, Throwable cause) {
        super(String.format(EntityNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), id), cause);
    }

    public EntityNotFoundException(Class<?> clazz, UUID id) {
        super(String.format(EntityNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), id));
    }
}
