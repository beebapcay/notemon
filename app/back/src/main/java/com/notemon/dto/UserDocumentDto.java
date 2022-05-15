package com.notemon.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDocumentDto extends BaseDto {
    private DocumentDto document;
    private UserDto user;
    private PermissionDto permission;

    private boolean isStarred;
    private boolean isPinned;
}
