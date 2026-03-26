package com.healthtracker.backend.repository;

import com.healthtracker.backend.dto.AnalyticsResponse;
import com.healthtracker.backend.entity.User;
import com.healthtracker.backend.entity.WaterIntake;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {

    List<WaterIntake> findByUser(User user);
    List<WaterIntake> findByUserAndIntakeDate(User user, LocalDate intakeDate);

    @Query("SELECT new com.healthtracker.backend.dto.AnalyticsResponse$WaterIntakeStats(" +
    	       "w.intakeDate, SUM(w.amountInLiters)) " +
    	       "FROM WaterIntake w " +
    	       "WHERE w.user.id = :userId " +
    	       "AND FUNCTION('MONTH', w.intakeDate) = :month " +
    	       "AND FUNCTION('YEAR', w.intakeDate) = :year " +
    	       "GROUP BY w.intakeDate")
    	List<AnalyticsResponse.WaterIntakeStats> findMonthlyWaterIntake(@Param("userId") Long userId,
    	                                                                 @Param("month") int month,
    	                                                                 @Param("year") int year);
}
