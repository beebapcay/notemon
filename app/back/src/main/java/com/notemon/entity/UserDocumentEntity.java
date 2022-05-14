package com.notemon.entity;

import com.notemon.entity.annotation.AppUUIDGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "USER_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("ALL")
public class UserDocumentEntity extends BaseEntity {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID", updatable = false, nullable = false)
    @NotNull
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID", nullable = false)
    @NotNull
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DOCUMENT_ID", nullable = false)
    @NotNull
    private DocumentEntity document;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PERMISSION_ID", nullable = false)
    @NotNull
    private PermissionEntity permission;
}
