package com.notemon.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.Collection;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "USER")
@Getter
@Setter
@NoArgsConstructor
@SuppressWarnings("ALL")
public class UserEntity extends AbstractEntity implements UserDetails {
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
