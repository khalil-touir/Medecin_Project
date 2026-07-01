package org.example.medecin_project.Controller;

import org.example.medecin_project.DTO.UserDTO;
import org.example.medecin_project.Entity.User;
import org.example.medecin_project.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> getAll() {
        return userService.getAll();
    }
    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}