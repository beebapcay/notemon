package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.DocumentDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.dto.UserDto;
import com.notemon.exception.EntityWithFieldNotFoundException;
import com.notemon.exception.EntityWithIdNotFoundException;
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
    public UserDto getUser(@PathVariable("id") UUID id) throws EntityWithIdNotFoundException {
        return userService.getUserById(id);
    }

    @PostMapping("{id}/document")
    public MessageResponseDto createNewDocument(@PathVariable("id") UUID id, @RequestBody DocumentDto documentDto)
            throws EntityWithIdNotFoundException, EntityWithFieldNotFoundException {
        return documentService.createNewDocument(id, documentDto);
    }
}
