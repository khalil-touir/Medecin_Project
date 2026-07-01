package org.example.medecin_project.Service;

import org.example.medecin_project.Entity.Notification;
import org.example.medecin_project.Entity.User;
import org.example.medecin_project.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmailService emailService;

    public void sendNotification(User user, String message) {

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .sentAt(LocalDateTime.now())
                .type("SYSTEM")
                .build();

        notificationRepository.save(notification);

        emailService.sendEmail(
                user.getEmail(),
                "Medical Appointment Notification",
                message
        );

        System.out.println(
                "Notification sent to "
                        + user.getEmail()
                        + ": "
                        + message
        );
    }

    public void notifyAppointmentCreated(User user) {

        sendNotification(
                user,
                "Your appointment has been successfully scheduled."
        );
    }

    public void notifyAppointmentCancelled(User user) {

        sendNotification(
                user,
                "Your appointment has been cancelled."
        );
    }
    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }
}