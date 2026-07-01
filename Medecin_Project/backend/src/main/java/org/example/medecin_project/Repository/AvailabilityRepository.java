package org.example.medecin_project.Repository;

import org.example.medecin_project.Entity.Availability;
import org.example.medecin_project.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    List<Availability> findByDoctorId(Long doctorId);

    boolean existsByDoctorAndDayOfWeekAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            Doctor doctor,
            DayOfWeek dayOfWeek,
            LocalTime startTime,
            LocalTime endTime
    );
}