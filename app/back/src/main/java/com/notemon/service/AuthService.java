package com.notemon.service;

import com.notemon.dto.LoginDto;
import com.notemon.dto.LoginResponseJwtDto;
import com.notemon.dto.SignupDto;
import com.notemon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    LoginResponseJwtDto loginLocal(LoginDto loginDto) {
        return null;
    }

    LoginResponseJwtDto loginGoogle(String googleToken) {
        return null;
    }

    UUID signup(SignupDto signupDto) {
        return null;
    }
}
