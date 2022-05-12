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
@Table(name = "DIRECTORY")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class DirectoryEntity extends NotemonDocumentEntity {
    @Id
    @Column(name = "ID", nullable = false, updatable = false)
    @NotNull
    private UUID id;
}
