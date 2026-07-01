package org.example.medecin_project.Service;

import org.example.medecin_project.DTO.AdminDashboardDTO;
import org.example.medecin_project.DTO.DoctorStatsDTO;
import org.example.medecin_project.Entity.AppointmentStatus;
import org.example.medecin_project.Repository.AppointmentRepository;
import org.example.medecin_project.Repository.DoctorRepository;
import org.example.medecin_project.Repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public DashboardService(DoctorRepository doctorRepository,
                            PatientRepository patientRepository,
                            AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public AdminDashboardDTO getDashboardStats() {

        LocalDateTime now = LocalDateTime.now();


        LocalDateTime startOfDay = now.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        LocalDateTime startOfWeek = now.minusDays(7);
        LocalDateTime startOfMonth = now.minusDays(30);


        Long activeDoctors = doctorRepository.count();


        Long newPatientsThisMonth =
                patientRepository.countByCreatedAtBetween(startOfMonth, now);

        Long todayAppointments =
                appointmentRepository.countByAppointmentDateBetween(startOfDay, endOfDay);

        Long appointmentsThisWeek =
                appointmentRepository.countByAppointmentDateBetween(startOfWeek, now);

        Long appointmentsThisMonth =
                appointmentRepository.countByAppointmentDateBetween(startOfMonth, now);

        return AdminDashboardDTO.builder()
                .totalDoctors(doctorRepository.count())
                .totalPatients(patientRepository.count())
                .totalAppointments(appointmentRepository.count())

                .scheduledAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.SCHEDULED))
                .canceledAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.CANCELED))
                .completedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.COMPLETED))

                .todayAppointments(todayAppointments)
                .appointmentsThisWeek(appointmentsThisWeek)
                .appointmentsThisMonth(appointmentsThisMonth)

                .activeDoctors(activeDoctors)
                .newPatientsThisMonth(newPatientsThisMonth)

                .build();
    }
    public List<DoctorStatsDTO> getDoctorStats() {
        return appointmentRepository.getAppointmentsPerDoctor();
    }
}