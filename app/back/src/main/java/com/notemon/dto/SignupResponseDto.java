package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
public class SignupResponseDto implements Serializable {
    private UUID id;
    private String name;
    private String email;
}
