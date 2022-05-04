package com.notemon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "USER")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class UserEntity extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false)
    @NotNull
    private Long id;

    @Column(name = "NAME", nullable = false)
    @NotNull
    private String name;

    @Column(name = "EMAIL", nullable = false, unique = true)
    @NotNull
    private String email;

    @Column(name = "PASSWORD", nullable = true)
    private String password;

    @Column(name = "REFESH_TOKEN", nullable = true)
    private String refreshToken;

    @Column(name = "GOOGLE_TOKEN", nullable = true)
    private String googleToken;
}
