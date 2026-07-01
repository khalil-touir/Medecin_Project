package org.example.medecin_project.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String speciality;
    private String phone;
}