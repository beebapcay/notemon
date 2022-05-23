package com.notemon.controller;

import com.notemon.constant.EndpointConstant;
import com.notemon.dto.*;
import com.notemon.entity.RoleEntity;
import com.notemon.entity.UserEntity;
import com.notemon.entity.impl.UserDetailsImpl;
import com.notemon.enums.RoleEnum;
import com.notemon.exception.EntityWithFieldNotFoundException;
import com.notemon.exception.EntityWithIdNotFoundException;
import com.notemon.exception.RefreshTokenException;
import com.notemon.repository.RoleRepository;
import com.notemon.repository.UserRepository;
import com.notemon.security.JwtTokenUtil;
import com.notemon.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(EndpointConstant.AUTHENTICATION_ENDPOINT)
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder encoder;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final SecurityUtil securityUtil;

    @GetMapping("demo")
    public String getDemo() {
        return "Authentication Demo";
    }

    @PostMapping("login/local")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto loginRequestDto)
            throws EntityWithFieldNotFoundException {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginRequestDto.getEmail(), loginRequestDto.getPassword()
                            )
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String jwtToken = jwtTokenUtil.generateJwtToken(userDetails);

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            UserEntity userEntity = userRepository.findByEmail(loginRequestDto.getEmail())
                    .orElseThrow(() -> new EntityWithFieldNotFoundException(UserEntity.class, "email", loginRequestDto.getEmail()));

            String refreshToken = jwtTokenUtil.generateRefreshToken();
            userEntity.setRefreshToken(refreshToken);
            userRepository.save(userEntity);

            return ResponseEntity.ok()
                    .body(new LoginResponseDto(
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getName(),
                            jwtToken,
                            roles,
                            securityUtil.getJwtExpiration(),
                            refreshToken
                    ));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequestDto signupDto) {
        if (userRepository.existsByEmail(signupDto.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponseDto("Error: Email is already taken"));
        }

        UserEntity user = new UserEntity(signupDto.getName(), signupDto.getEmail(), encoder.encode(signupDto.getPassword()));
        user.setIPassword(signupDto.getPassword());

        RoleEnum role = signupDto.getRoles();
        RoleEntity roleEntity;

        if (ObjectUtils.isEmpty(role)) {
            roleEntity = roleRepository.findByName(RoleEnum.USER)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
        } else {
            roleEntity = roleRepository.findByName(role)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
        }

        user.setRole(roleEntity);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponseDto("User signup successfully"));
    }

    @PostMapping("refreshToken")
    public ResponseEntity<LoginResponseDto> refreshToken(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto)
            throws EntityWithIdNotFoundException, RefreshTokenException {
        String refreshToken = refreshTokenRequestDto.getRefreshToken();
        return userRepository.findByRefreshToken(refreshToken)
                .map(userEntity -> {
                    UserDetailsImpl userDetails = UserDetailsImpl.build(userEntity);

                    String jwtToken = jwtTokenUtil.generateJwtToken(userDetails);

                    List<String> roles = userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList());

                    return ResponseEntity.ok()
                            .body(new LoginResponseDto(
                                    userDetails.getId(),
                                    userDetails.getEmail(),
                                    userDetails.getName(),
                                    jwtToken,
                                    roles,
                                    securityUtil.getJwtExpiration(),
                                    refreshToken
                            ));
                })
                .orElseThrow(() -> new RefreshTokenException(refreshToken));
    }

}
