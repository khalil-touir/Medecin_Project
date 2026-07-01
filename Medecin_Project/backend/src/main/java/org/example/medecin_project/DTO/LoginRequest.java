package org.example.medecin_project.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}