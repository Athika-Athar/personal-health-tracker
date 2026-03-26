package com.healthtracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthtracker.backend.entity.GoalSetting;
import com.healthtracker.backend.entity.User;

import java.util.List;

public interface GoalSettingRepository extends JpaRepository<GoalSetting, Long> {
    List<GoalSetting> findByUser(User user);
}
