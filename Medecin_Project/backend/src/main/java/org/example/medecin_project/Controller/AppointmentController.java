package org.example.medecin_project.Controller;

import org.example.medecin_project.Entity.Appointment;
import org.example.medecin_project.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.medecin_project.DTO.AppointmentDTO;
import org.example.medecin_project.Mapper.AppointmentMapper;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        return appointmentService.create(appointment);
    }

    @GetMapping
    public List<AppointmentDTO> getAll() {
        return appointmentService.getAll()
                .stream()
                .map(AppointmentMapper::toDTO)
                .toList();
    }

    @GetMapping("/doctor/{id}")
    public List<AppointmentDTO> getByDoctor(@PathVariable Long id) {
        return appointmentService.getByDoctor(id)
                .stream()
                .map(AppointmentMapper::toDTO)
                .toList();
    }

    @GetMapping("/patient/{id}")
    public List<AppointmentDTO> getByPatient(@PathVariable Long id) {
        return appointmentService.getByPatient(id)
                .stream()
                .map(AppointmentMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public AppointmentDTO getById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getById(id);
        return AppointmentMapper.toDTO(appointment);

    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        appointmentService.delete(id);
    }
}
