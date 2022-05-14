package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDto extends BaseDto {
    private String name;
    private String description;

    private UUID parent;
    private Set<UUID> children;

    private boolean isDirectory;
    private boolean isStarred;
    private boolean isPinned;

    private UserDto author;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
