package org.example.medecin_project.Repository;


import org.example.medecin_project.DTO.DoctorStatsDTO;
import org.example.medecin_project.Entity.Appointment;
import org.example.medecin_project.Entity.AppointmentStatus;
import org.example.medecin_project.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    boolean existsByDoctorAndAppointmentDate(Doctor doctor, LocalDateTime appointmentDate);

    Long countByStatus(AppointmentStatus status);

    @Query("""
SELECT new org.example.medecin_project.DTO.DoctorStatsDTO(
    CONCAT(d.firstName, ' ', d.lastName),
    COUNT(a)
)
FROM Appointment a
JOIN a.doctor d
GROUP BY d.firstName, d.lastName
""")
    List<DoctorStatsDTO> getAppointmentsPerDoctor();
    Long countByAppointmentDateBetween(
            LocalDateTime start,
            LocalDateTime end);

}