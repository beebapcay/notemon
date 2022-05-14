package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.DocumentDto;
import com.notemon.dto.UserDto;
import com.notemon.exception.AppBusinessException;
import com.notemon.exception.EntityNotFoundException;
import com.notemon.service.DocumentService;
import com.notemon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(EndpointConstant.USER_ENDPOINT)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final DocumentService documentService;

    @GetMapping("{id}")
    public UserDto getUser(@PathVariable("id") UUID id) throws EntityNotFoundException {
        return userService.getUserById(id);
    }

    @PostMapping("{id}/create-new-document")
    public DocumentDto createNewDocument(@PathVariable("id") UUID id, @RequestBody DocumentDto documentDto)
            throws EntityNotFoundException, AppBusinessException {
        return documentService.createNewDocument(id, documentDto);
    }
}
