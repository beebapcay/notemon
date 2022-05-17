package com.notemon.entity;

import com.notemon.entity.annotation.AppUUIDGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("ALL")
public class DocumentEntity extends BaseEntity {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID", updatable = false, nullable = false)
    @NotNull
    private UUID id;

    @Column(name = "NAME", nullable = false)
    @NotNull
    private String name;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;

    @Column(name = "IS_DIRECTORY", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    @NotNull
    private boolean isDirectory = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PARENT_ID", nullable = true)
    private DocumentEntity parent = null;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private Set<DocumentEntity> children;

    @OneToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    @NotNull
    private UserEntity author;

    @Column(name = "CONTENT", nullable = true)
    private String content;

    @Column(name = "SHARE_CODE", nullable = true)
    private String shareCode;
}
