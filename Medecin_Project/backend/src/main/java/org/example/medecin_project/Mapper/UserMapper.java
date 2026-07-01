package org.example.medecin_project.Mapper;

import org.example.medecin_project.DTO.UserDTO;
import org.example.medecin_project.Entity.Role;
import org.example.medecin_project.Entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public static User toEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(Role.valueOf(dto.getRole()))
                .build();
    }
}