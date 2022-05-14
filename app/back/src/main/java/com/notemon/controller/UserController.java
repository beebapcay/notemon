package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.UserDto;
import com.notemon.exception.EntityNotFoundException;
import com.notemon.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(EndpointConstant.USER_ENDPOINT)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("{id}")
    public UserDto getUser(@PathVariable("id") UUID id) throws EntityNotFoundException {
        return userService.getUserById(id);
    }

}
