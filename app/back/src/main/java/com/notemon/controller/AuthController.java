package com.notemon.controller;

import com.notemon.config.JwtTokenUtil;
import com.notemon.constant.EndpointConstant;
import com.notemon.dto.LoginRequestDto;
import com.notemon.dto.LoginResponseDto;
import com.notemon.dto.MessageResponseDto;
import com.notemon.dto.SignupRequestDto;
import com.notemon.entity.RoleEntity;
import com.notemon.entity.UserEntity;
import com.notemon.entity.impl.UserDetailsImpl;
import com.notemon.enums.RoleEnum;
import com.notemon.repository.RoleRepository;
import com.notemon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(EndpointConstant.AUTHENTICATION_ENDPOINT)
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    @GetMapping("/demo")
    public String getDemo() {
        return "Authentication Demo";
    }

    @PostMapping("/login/local")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginRequestDto.getEmail(), loginRequestDto.getPassword()
                            )
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtTokenUtil.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return ResponseEntity.ok()
                    .body(new LoginResponseDto(
                            userDetails.getUsername(),
                            userDetails.getName(),
                            jwtToken,
                            roles,
                            JwtTokenUtil.JWT_TOKEN_VALIDITY_TIME,
                            userDetails.getRefreshToken()
                    ));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDto signupDto) {
        if (userRepository.existsByEmail(signupDto.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponseDto("Error: Email is already taken"));
        }

        UserEntity user = new UserEntity(signupDto.getName(), signupDto.getEmail(), encoder.encode(signupDto.getPassword()));

        Set<RoleEnum> roles = Optional.ofNullable(signupDto.getRoles()).orElse(Set.of());
        Set<RoleEntity> rolesEntity = new HashSet<>();

        if (roles.isEmpty()) {
            RoleEntity roleEntity = roleRepository.findByName(RoleEnum.USER)
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            rolesEntity.add(roleEntity);
        } else {
            roles.forEach(roleEnum -> {
                RoleEntity roleEntity = roleRepository.findByName(roleEnum)
                        .orElseThrow(() -> new RuntimeException("Role not found"));

                rolesEntity.add(roleEntity);
            });
        }

        user.setRoles(rolesEntity);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponseDto("User signup successfully"));
    }
}
