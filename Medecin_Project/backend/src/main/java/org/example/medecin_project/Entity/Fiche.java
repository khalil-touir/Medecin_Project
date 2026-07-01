package org.example.medecin_project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Fiche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;












}


