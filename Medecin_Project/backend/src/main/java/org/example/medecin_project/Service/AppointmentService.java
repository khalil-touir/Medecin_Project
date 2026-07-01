package org.example.medecin_project.Service;

import org.example.medecin_project.Entity.Appointment;
import org.example.medecin_project.Entity.Doctor;
import org.example.medecin_project.Repository.AppointmentRepository;
import org.example.medecin_project.Repository.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private NotificationService notificationService;

    public Appointment create(Appointment appointment) {

        if (appointment.getDoctor() == null) {
            throw new RuntimeException("Doctor is required");
        }

        if (appointment.getPatient() == null) {
            throw new RuntimeException("Patient is required");
        }

        if (appointment.getAppointmentDate() == null) {
            throw new RuntimeException("Date is required");
        }

        Doctor doctor = appointment.getDoctor();
        LocalDateTime dateTime = appointment.getAppointmentDate();

        if (!isDoctorAvailable(doctor, dateTime)) {
            throw new RuntimeException("Doctor not available at this time");
        }

        if (appointmentRepository.existsByDoctorAndAppointmentDate(doctor, dateTime)) {
            throw new RuntimeException("Slot already taken");
        }

        Appointment savedAppointment = appointmentRepository.save(appointment);

        notificationService.notifyAppointmentCreated(
                appointment.getPatient().getUser()
        );

        return savedAppointment;
    }
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public void delete(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        notificationService.notifyAppointmentCancelled(
                appointment.getPatient().getUser()
        );

        appointmentRepository.deleteById(id);
    }
    public Appointment getById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }


    private boolean isDoctorAvailable(Doctor doctor, LocalDateTime dateTime) {

        DayOfWeek day = dateTime.getDayOfWeek();
        LocalTime time = dateTime.toLocalTime();

        return availabilityRepository
                .existsByDoctorAndDayOfWeekAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                        doctor,
                        day,
                        time,
                        time
                );
    }
}