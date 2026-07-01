package org.example.medecin_project.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorStatsDTO {

    private String doctorName;
    private Long appointmentCount;
    private Long totalAppointments;

    public DoctorStatsDTO(String doctorName, Long appointmentCount) {
        this.doctorName = doctorName;
        this.appointmentCount = appointmentCount;
    }
}
