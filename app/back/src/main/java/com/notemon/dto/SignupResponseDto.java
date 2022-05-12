package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class SignupResponseDto {
    private UUID id;
    private String name;
    private String email;
}
