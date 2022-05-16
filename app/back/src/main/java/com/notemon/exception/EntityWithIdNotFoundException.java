package com.notemon.exception;

import java.util.UUID;

public class EntityWithIdNotFoundException extends AppBusinessException {
    private static final String MESSAGE_PATTERN = "Entity %s with id %s is not found";

    public EntityWithIdNotFoundException(Class<?> clazz, UUID id, Throwable cause) {
        super(String.format(EntityWithIdNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), id), cause);
    }

    public EntityWithIdNotFoundException(Class<?> clazz, UUID id) {
        super(String.format(EntityWithIdNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), id));
    }
}
