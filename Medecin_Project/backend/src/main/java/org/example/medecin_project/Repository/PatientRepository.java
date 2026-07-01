package org.example.medecin_project.Repository;

import org.example.medecin_project.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByLastName(String lastName);
    Long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}