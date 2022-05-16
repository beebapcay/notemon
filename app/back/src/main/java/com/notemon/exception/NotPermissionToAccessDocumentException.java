package com.notemon.exception;

import java.util.UUID;

public class NotPermissionToAccessDocumentException extends AppBusinessException {
    public static final String MESSAGE_PATTERN = "You don't have permission to access this document (User id: %s, Document id: %s)";

    public NotPermissionToAccessDocumentException(UUID userId, UUID documentId) {
        super(String.format(MESSAGE_PATTERN, userId, documentId));
    }

    public NotPermissionToAccessDocumentException(UUID userId, UUID documentId, Throwable cause) {
        super(String.format(MESSAGE_PATTERN, userId, documentId), cause);
    }
}
