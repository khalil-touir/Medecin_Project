package org.example.medecin_project.Controller;

import org.example.medecin_project.DTO.AdminDashboardDTO;
import org.example.medecin_project.DTO.DoctorStatsDTO;
import org.example.medecin_project.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public AdminDashboardDTO getStats() {
        return dashboardService.getDashboardStats();
    }
    @GetMapping("/doctor-stats")
    public List<DoctorStatsDTO> getDoctorStats() {
        return dashboardService.getDoctorStats();
    }
}