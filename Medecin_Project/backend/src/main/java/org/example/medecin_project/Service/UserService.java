package org.example.medecin_project.Service;

import org.example.medecin_project.DTO.UserDTO;
import org.example.medecin_project.Entity.User;
import org.example.medecin_project.Mapper.UserMapper;
import org.example.medecin_project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    public UserDTO create(UserDTO dto) {

        User user = UserMapper.toEntity(dto);

        User saved = userRepository.save(user);

        return UserMapper.toDTO(saved);
    }

    public List<UserDTO> getAll() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    public UserDTO getById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserMapper.toDTO(user);
    }
    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
