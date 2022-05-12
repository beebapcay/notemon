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
@Table(name = "USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("ALL")
public class UserEntity extends BaseEntity {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID",
            updatable = false,
            nullable = false)
    @NotNull
    private UUID id;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    @NotNull
    private RoleEntity role;

    public UserEntity(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
