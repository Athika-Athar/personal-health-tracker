package com.healthtracker.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.healthtracker.backend.entity.Medication;
import com.healthtracker.backend.entity.User;
import com.healthtracker.backend.repository.MedicationRepository;
import com.healthtracker.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicationController {

    private final MedicationRepository medicationRepository;
    private final UserRepository userRepository;

    public MedicationController(MedicationRepository medicationRepository,
                                UserRepository userRepository) {
        this.medicationRepository = medicationRepository;
        this.userRepository = userRepository;
    }

    // ✅ GET medications by userId
    @GetMapping("/{userId}")
    public List<Medication> getMedications(@PathVariable Long userId) {
        return medicationRepository.findByUserId(userId);
    }

    // ✅ ADD medication
    @PostMapping
    public Medication addMedication(@RequestBody Medication medication,
                                    @RequestParam Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        medication.setUser(user);

        return medicationRepository.save(medication);
    }

    // ✅ MARK medication as taken
    @PutMapping("/taken/{id}")
    public Medication markTaken(@PathVariable Long id) {

        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        medication.setTaken(true);

        return medicationRepository.save(medication);
    }

    // ✅ DELETE medication
    @DeleteMapping("/{id}")
    public void deleteMedication(@PathVariable Long id) {
        medicationRepository.deleteById(id);
    }
}