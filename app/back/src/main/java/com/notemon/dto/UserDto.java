package com.notemon.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends BaseDto {
    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;
}
