package org.example.medecin_project.Controller;

import org.example.medecin_project.DTO.LoginRequest;
import org.example.medecin_project.DTO.RegisterRequest;
import org.example.medecin_project.Security.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest request) {
        return Map.of("token", authService.register(request));
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        return Map.of("token", authService.login(request));
    }
}