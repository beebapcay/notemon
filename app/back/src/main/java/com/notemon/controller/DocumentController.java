package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.dto.UserDocumentDto;
import com.notemon.exception.*;
import com.notemon.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(EndpointConstant.DOCUMENT_ENDPOINT)
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @GetMapping("/shareCode/{shareCode}")
    public DocumentDto getDocumentByShareCode(@PathVariable String shareCode)
            throws EntityWithFieldNotFoundException {
        return documentService.getDocumentByShareCode(shareCode);
    }

    @PatchMapping("{id}/users/{userId}/name")
    public DocumentDto updateNameDocument(@PathVariable("id") UUID id, @PathVariable("userId") UUID userId, @RequestBody DocumentDto documentDto)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException,
            NotPermissionToEditDocumentException {
        return documentService.updateNameDocument(id, userId, documentDto);
    }

    @PatchMapping("{id}/users/{userId}/starred")
    public DocumentDto updateStarredDocument(@PathVariable("id") UUID id, @PathVariable("userId") UUID userId, @RequestBody UserDocumentDto userDocumentDto)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException {
        return documentService.updateStarredDocument(id, userId, userDocumentDto);
    }

    @PostMapping("{id}/partner")
    public UserDocumentDto addPartnerToDocument(@PathVariable("id") UUID id, @RequestBody UserDocumentDto userDocumentDto)
            throws
            EntityWithIdNotFoundException,
            EntityWithFieldNotFoundException,
            UserAlreadyInRelationshipWithDocumentException {
        return documentService.addPartnerToDocument(id, userDocumentDto);
    }

    @DeleteMapping("{id}/users/{userId}")
    public MessageResponseDto deleteDocument(@PathVariable("id") UUID id, @PathVariable("userId") UUID userId)
            throws EntityWithIdNotFoundException,
            NotPermissionToAccessDocumentException {
        return documentService.deleteDocument(id, userId);
    }
}
