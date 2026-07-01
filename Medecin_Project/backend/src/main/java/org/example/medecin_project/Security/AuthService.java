package org.example.medecin_project.Security;

import org.example.medecin_project.DTO.LoginRequest;
import org.example.medecin_project.DTO.RegisterRequest;
import org.example.medecin_project.DTO.UserDTO;
import org.example.medecin_project.Entity.Role;
import org.example.medecin_project.Entity.User;
import org.example.medecin_project.Repository.UserRepository;
import org.example.medecin_project.Security.JWTService;
import org.example.medecin_project.Service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public AuthService(UserService userService,
                       PasswordEncoder passwordEncoder,
                       JWTService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    public String register(RegisterRequest request) {

        UserDTO userDTO = UserDTO.builder()
                .email(request.getEmail())
                .role(request.getRole())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userService.create(userDTO);

        return jwtService.generateToken(request.getEmail(), request.getRole());
    }


    public String login(LoginRequest request) {

        User user = userService.getByEmail(request.getEmail());

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }
}