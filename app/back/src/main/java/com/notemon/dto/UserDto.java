package com.notemon.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends BaseDto {
    private String name;
    private String email;
    private String password;
}
