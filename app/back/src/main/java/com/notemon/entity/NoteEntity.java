package com.notemon.entity;

import com.notemon.entity.annotation.AppUUIDGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
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
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
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
