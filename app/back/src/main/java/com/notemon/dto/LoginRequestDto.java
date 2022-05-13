package com.notemon.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginRequestDto implements Serializable {
    private String email;
    private String password;
    private String googleToken;
}
