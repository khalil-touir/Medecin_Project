package org.example.medecin_project.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardDTO {

    private Long totalDoctors;
    private Long totalPatients;
    private Long totalAppointments;

    private Long scheduledAppointments;
    private Long canceledAppointments;
    private Long completedAppointments;
    private Long todayAppointments;
    private Long appointmentsThisWeek;
    private Long appointmentsThisMonth;
    private Long activeDoctors;
    private Long newPatientsThisMonth;
}
