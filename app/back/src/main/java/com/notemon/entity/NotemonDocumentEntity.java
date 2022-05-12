package com.notemon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "NOTEMON_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class NotemonDocumentEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false)
    @NotNull
    private UUID id;

    @Column(name = "NAME", nullable = false)
    @NotNull
    private String name;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;
}
