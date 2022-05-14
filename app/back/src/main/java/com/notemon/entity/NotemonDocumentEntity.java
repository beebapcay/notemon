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
@Table(name = "NOTEMON_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class NotemonDocumentEntity extends BaseEntity {
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
}
