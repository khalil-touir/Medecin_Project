package org.example.medecin_project.Mapper;

import org.example.medecin_project.DTO.AppointmentDTO;
import org.example.medecin_project.Entity.Appointment;

public class AppointmentMapper {

    public static AppointmentDTO toDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus().name())
                .doctorId(appointment.getDoctor().getId())
                .patientId(appointment.getPatient().getId())
                .build();
    }
}