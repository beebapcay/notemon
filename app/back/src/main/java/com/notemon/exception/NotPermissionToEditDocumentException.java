package com.notemon.exception;

import java.util.UUID;

public class NotPermissionToEditDocumentException extends AppBusinessException {
    public static final String MESSAGE_PATTERN = "You don't have permission to edit this document (User id: %s, Document id: %s)";

    public NotPermissionToEditDocumentException(UUID userId, UUID documentId) {
        super(String.format(MESSAGE_PATTERN, userId, documentId));
    }
}
