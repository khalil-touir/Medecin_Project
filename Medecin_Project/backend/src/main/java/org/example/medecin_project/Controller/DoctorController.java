package org.example.medecin_project.Controller;

import org.example.medecin_project.DTO.DoctorDTO;
import org.example.medecin_project.Mapper.DoctorMapper;
import org.example.medecin_project.Service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public DoctorDTO create(@RequestBody DoctorDTO dto) {
        return doctorService.create(dto);
    }

    @GetMapping
    public List<DoctorDTO> getAll() {
        return doctorService.getAll();
    }

    @GetMapping("/speciality/{speciality}")
    public List<DoctorDTO> getBySpeciality(@PathVariable String speciality) {
        return doctorService.getBySpeciality(speciality)
                .stream()
                .map(DoctorMapper::toDTO)
                .toList();
    }
    @GetMapping("/phone/{phone}")
    public DoctorDTO getByPhone(@PathVariable String phone) {
        return doctorService.getByPhone(phone);
    }
    @GetMapping("/count")
    public Long countDoctors() {
        return doctorService.countDoctors();
    }
}