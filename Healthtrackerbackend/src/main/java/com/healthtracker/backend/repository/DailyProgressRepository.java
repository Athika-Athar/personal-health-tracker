package com.healthtracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthtracker.backend.entity.DailyProgress;
import com.healthtracker.backend.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyProgressRepository extends JpaRepository<DailyProgress, Long> {
    Optional<DailyProgress> findByUserAndDate(User user, LocalDate date);
    List<DailyProgress> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);
}
