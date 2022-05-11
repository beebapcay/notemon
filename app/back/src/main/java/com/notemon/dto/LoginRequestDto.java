package com.notemon.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
    private String googleToken;
}
