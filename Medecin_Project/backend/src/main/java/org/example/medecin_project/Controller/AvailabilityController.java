package org.example.medecin_project.Controller;

import org.example.medecin_project.Entity.Availability;
import org.example.medecin_project.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public Availability add(@RequestBody Availability availability) {
        return scheduleService.addAvailability(availability);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Availability> getDoctorSchedule(@PathVariable Long doctorId) {
        return scheduleService.getDoctorSchedule(doctorId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        scheduleService.deleteAvailability(id);
    }
}