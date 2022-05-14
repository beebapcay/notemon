package com.notemon.dto;

import com.notemon.enums.RoleEnum;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class SignupRequestDto implements Serializable {
    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private RoleEnum roles;
}
