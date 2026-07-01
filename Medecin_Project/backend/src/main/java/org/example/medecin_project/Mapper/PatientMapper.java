package org.example.medecin_project.Mapper;

import org.example.medecin_project.DTO.PatientDTO;
import org.example.medecin_project.Entity.Patient;

public class PatientMapper {

    public static PatientDTO toDTO(Patient patient) {
        return PatientDTO.builder()
                .id(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .phone(patient.getPhone())
                .dateOfBirth(patient.getDateOfBirth())
                .build();
    }

    public static Patient toEntity(PatientDTO dto) {
        return Patient.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phone(dto.getPhone())
                .dateOfBirth(dto.getDateOfBirth())
                .build();
    }
}