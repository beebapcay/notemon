package com.notemon.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("isStarred")
    private boolean isStarred;

    @JsonProperty("isPinned")
    private boolean isPinned;
}
