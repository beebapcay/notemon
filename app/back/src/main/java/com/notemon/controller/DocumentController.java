package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
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
}
