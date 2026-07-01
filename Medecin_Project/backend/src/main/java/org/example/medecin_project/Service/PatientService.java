package org.example.medecin_project.Service;

import org.example.medecin_project.DTO.PatientDTO;
import org.example.medecin_project.Entity.Patient;
import org.example.medecin_project.Mapper.PatientMapper;
import org.example.medecin_project.Repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public PatientDTO create(PatientDTO dto) {
        Patient patient = PatientMapper.toEntity(dto);
        return PatientMapper.toDTO(patientRepository.save(patient));
    }

    public List<PatientDTO> getAll() {
        return patientRepository.findAll()
                .stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<PatientDTO> getByLastName(String lastName) {
        return patientRepository.findByLastName(lastName)
                .stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());
    }
}