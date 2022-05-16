package com.notemon.dto;

import com.notemon.enums.PermissionEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto extends BaseDto {
    private PermissionEnum code;
    private String description;
}
