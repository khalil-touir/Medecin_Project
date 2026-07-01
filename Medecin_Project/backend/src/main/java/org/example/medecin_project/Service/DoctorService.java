package org.example.medecin_project.Service;

import org.example.medecin_project.DTO.DoctorDTO;
import org.example.medecin_project.Entity.Doctor;
import org.example.medecin_project.Mapper.DoctorMapper;
import org.example.medecin_project.Repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public DoctorDTO create(DoctorDTO dto) {
        Doctor doctor = DoctorMapper.toEntity(dto);
        return DoctorMapper.toDTO(doctorRepository.save(doctor));
    }

    public List<DoctorDTO> getAll() {
        return doctorRepository.findAll()
                .stream()
                .map(DoctorMapper::toDTO)
                .collect(Collectors.toList());

    }public List<Doctor> getBySpeciality(String speciality) {
        return doctorRepository.findBySpeciality(speciality);
    }
    public DoctorDTO getByPhone(String phone) {

        Doctor doctor = doctorRepository.findByPhone(phone);

        if (doctor == null) {
            throw new RuntimeException("Doctor not found");
        }

        return DoctorMapper.toDTO(doctor);
    }
    public Long countDoctors() {
        return doctorRepository.countBy();
    }
}
