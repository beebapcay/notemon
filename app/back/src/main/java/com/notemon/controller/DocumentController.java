package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.dto.UserDocumentDto;
import com.notemon.exception.EntityWithIdNotFoundException;
import com.notemon.exception.NotPermissionToAccessDocumentException;
import com.notemon.exception.NotPermissionToEditDocumentException;
import com.notemon.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(EndpointConstant.DOCUMENT_ENDPOINT)
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @PatchMapping("{id}/users/{userId}/name")
    public MessageResponseDto updateNameDocument(@PathVariable("id") UUID id, @PathVariable("userId") UUID userId, @RequestBody DocumentDto documentDto)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException,
            NotPermissionToEditDocumentException {
        return documentService.updateNameDocument(id, userId, documentDto);
    }

    @PatchMapping("{id}/users/{userId}/starred")
    public MessageResponseDto updateStarredDocument(@PathVariable("id") UUID id, @PathVariable("userId") UUID userId, @RequestBody UserDocumentDto userDocumentDto)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException {
        return documentService.updateStarredDocument(id, userId, userDocumentDto);
    }
}
