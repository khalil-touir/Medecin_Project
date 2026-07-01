package org.example.medecin_project.Controller;

import org.example.medecin_project.Entity.Notification;
import org.example.medecin_project.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(
            @PathVariable Long userId) {

        return notificationService.getNotificationsByUser(userId);
    }
}