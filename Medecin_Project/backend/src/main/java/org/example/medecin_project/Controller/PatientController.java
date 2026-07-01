package org.example.medecin_project.Controller;

import org.example.medecin_project.DTO.PatientDTO;
import org.example.medecin_project.Service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public PatientDTO create(@RequestBody PatientDTO dto) {
        return patientService.create(dto);
    }

    @GetMapping
    public List<PatientDTO> getAll() {
        return patientService.getAll();
    }

    @GetMapping("/lastname/{lastName}")
    public List<PatientDTO> getByLastName(@PathVariable String lastName) {
        return patientService.getByLastName(lastName);
    }
}