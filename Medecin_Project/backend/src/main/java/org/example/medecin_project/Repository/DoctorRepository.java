package org.example.medecin_project.Repository;

import org.example.medecin_project.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findBySpeciality(String speciality);

    Doctor findByPhone(String phone);
    Long countBy();
}