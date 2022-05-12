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
@Table(name = "DIRECTORY")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class DirectoryEntity extends NotemonDocumentEntity {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID", nullable = false, updatable = false)
    @NotNull
    private UUID id;
}
