package com.notemon.security.impl;

import com.notemon.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuditorAwareImpl implements AuditorAware<String> {

    private final AuthenticationFacade authenticationFacade;

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.ofNullable(authenticationFacade.getAuthentication().getName());
    }
}
