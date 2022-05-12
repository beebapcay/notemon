package com.notemon.entity;

import com.notemon.entity.annotation.AppUUIDGenerator;
import com.notemon.enums.RoleEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "IROLE")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class RoleEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID",
            updatable = false,
            nullable = false)
    @NotNull
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "NAME", nullable = false)
    @NotNull
    private RoleEnum name;
}
