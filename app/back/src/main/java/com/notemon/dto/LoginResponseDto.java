package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String email;
    private String name;
    private String token;
    private List<String> roles;
    private String expiresIn;
    private String refreshToken;
}
