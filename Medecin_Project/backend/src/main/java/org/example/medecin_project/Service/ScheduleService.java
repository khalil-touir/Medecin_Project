package org.example.medecin_project.Service;

import lombok.RequiredArgsConstructor;
import org.example.medecin_project.Entity.Availability;
import org.example.medecin_project.Repository.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private AvailabilityRepository availabilityRepository;


    public Availability addAvailability(Availability availability) {
        return availabilityRepository.save(availability);
    }

    public List<Availability> getDoctorSchedule(Long doctorId) {
        return availabilityRepository.findByDoctorId(doctorId);
    }

    public void deleteAvailability(Long id) {
        availabilityRepository.deleteById(id);
    }
}