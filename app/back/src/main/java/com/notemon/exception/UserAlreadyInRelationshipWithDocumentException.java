package com.notemon.exception;

import java.util.UUID;

public class UserAlreadyInRelationshipWithDocumentException extends AppBusinessException {
    public static final String MESSAGE_PATTERN = "User already in relationship with document (User ID: %s, Document ID: %s)";

    public UserAlreadyInRelationshipWithDocumentException(UUID documentId, UUID userId) {
        super(String.format(MESSAGE_PATTERN, userId, documentId));
    }
}
