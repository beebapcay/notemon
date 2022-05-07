package com.notemon.dto;

import com.notemon.enums.RoleEnum;

public class LoginResponseJwtDto {
    private String name;
    private String email;
    private String token;
    private RoleEnum role;
    private String expiresIn;
    private String refreshToken;
}
