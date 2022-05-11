package com.notemon.dto;

import lombok.Data;

@Data
public class LoginResponseDto {
    private String token;
    private String name;
    private String email;
    private String role;
    private String expiresIn;
    private String refreshToken;
}
