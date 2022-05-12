package com.notemon.dto;

import com.notemon.enums.RoleEnum;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class SignupRequestDto {
    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private Set<RoleEnum> roles;
}
