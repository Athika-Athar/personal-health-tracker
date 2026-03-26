package com.healthtracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthtracker.backend.entity.Medication;

import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication, Long> {

    List<Medication> findByUserId(Long userId);
}
