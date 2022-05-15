package com.notemon.exception;

public class EntityWithFieldNotFoundException extends AppBusinessException {
    private static final String MESSAGE_PATTERN = "Entity %s with field %s has value %s is not found";

    public EntityWithFieldNotFoundException(Class<?> clazz, String field, String value, Throwable cause) {
        super(String.format(EntityWithFieldNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), field, value), cause);
    }

    public EntityWithFieldNotFoundException(Class<?> clazz, String field, String value) {
        super(String.format(EntityWithFieldNotFoundException.MESSAGE_PATTERN, clazz.getSimpleName(), field, value));
    }
}
