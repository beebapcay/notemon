package com.notemon.security;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
public class SecurityUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private String jwtExpiration;

    @Value("${jwt.validity}")
    private int jwtValidity;

    @Value("${base.account.admin.username}")
    private String baseAccountAdminUsername;

    @Value("${base.account.admin.password}")
    private String baseAccountAdminPassword;
}
