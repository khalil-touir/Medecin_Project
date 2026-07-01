package org.example.medecin_project.DTO;

import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private LocalDateTime appointmentDate;
    private LocalTime appointmentTime;
    private String status;

    private Long doctorId;
    private Long patientId;
}