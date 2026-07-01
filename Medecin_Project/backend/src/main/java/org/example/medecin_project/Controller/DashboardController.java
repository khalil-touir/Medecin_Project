package org.example.medecin_project.Controller;


import org.example.medecin_project.DTO.AdminDashboardDTO;
import org.example.medecin_project.Service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public AdminDashboardDTO getDashboard() {
        return dashboardService.getDashboardStats();
    }
}