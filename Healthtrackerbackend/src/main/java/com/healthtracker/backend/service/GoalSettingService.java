package com.healthtracker.backend.service;

import com.healthtracker.backend.dto.GoalSettingRequest;
import com.healthtracker.backend.entity.GoalSetting;
import com.healthtracker.backend.entity.User;
import com.healthtracker.backend.repository.GoalSettingRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalSettingService {

    private final GoalSettingRepository repo;

    public GoalSettingService(GoalSettingRepository repo) {
        this.repo = repo;
    }

    public GoalSetting createGoal(User user, GoalSettingRequest req) {
        GoalSetting goal = new GoalSetting();
        goal.setUser(user);
        goal.setType(req.type);
        goal.setTargetValue(req.targetValue);
        goal.setFrequency(req.frequency);
        goal.setStartDate(req.startDate);
        goal.setEndDate(req.endDate);
        return repo.save(goal);
    }

    public List<GoalSetting> getGoals(User user) {
        return repo.findByUser(user);
    }

    public void deleteGoal(User user, Long id) {
        GoalSetting goal = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!goal.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized");
        repo.delete(goal);
    }
}