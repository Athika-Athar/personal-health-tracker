package com.healthtracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthtracker.backend.entity.DailyActivity;
import com.healthtracker.backend.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface DailyActivityRepository extends JpaRepository<DailyActivity, Long> {
    List<DailyActivity> findByUser(User user);
    List<DailyActivity> findByUserAndActivityDate(User user, LocalDate date);
}
