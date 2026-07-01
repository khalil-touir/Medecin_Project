package org.example.medecin_project.Mapper;

import org.example.medecin_project.DTO.DoctorDTO;
import org.example.medecin_project.Entity.Doctor;

public class DoctorMapper {

    public static DoctorDTO toDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .id(doctor.getId())
                .firstName(doctor.getFirstName())
                .lastName(doctor.getLastName())
                .speciality(doctor.getSpeciality())
                .phone(doctor.getPhone())
                .build();
    }

    public static Doctor toEntity(DoctorDTO dto) {
        return Doctor.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .speciality(dto.getSpeciality())
                .phone(dto.getPhone())
                .build();
    }
}