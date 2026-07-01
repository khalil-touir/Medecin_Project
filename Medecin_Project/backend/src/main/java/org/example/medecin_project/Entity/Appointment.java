package org.example.medecin_project.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor

@AllArgsConstructor
@Builder

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime appointmentDate;
    private LocalTime appointmentTime;


    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

}