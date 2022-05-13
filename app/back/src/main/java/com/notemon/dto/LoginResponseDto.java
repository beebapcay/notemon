package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponseDto implements Serializable {
    private String email;
    private String name;
    private String token;
    private List<String> roles;
    private String expiresIn;
    private String refreshToken;
}
