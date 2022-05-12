package com.notemon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "NOTE")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class NoteEntity extends BaseEntity {
    @Id
    @Column(name = "ID", nullable = false, updatable = false)
    @NotNull
    private UUID id;

    @Column(name = "CONTENT", nullable = true)
    private String content;

    @Column(name = "IS_STARRED", columnDefinition = "boolean default false")
    private boolean isStarred = false;

    @Column(name = "IS_PINNED", columnDefinition = "boolean default false")
    private boolean isPinned = false;

    @Column(name = "SHARE_LINK", nullable = false)
    @NotNull
    private String shareLink;
}
