package org.example.medecin_project.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate dateOfBirth;
}