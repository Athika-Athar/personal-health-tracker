package com.healthtracker.backend.repository;

import com.healthtracker.backend.dto.AnalyticsResponse;
import com.healthtracker.backend.entity.MoodEntry;
import com.healthtracker.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {

    List<MoodEntry> findByUser(User user);
    List<MoodEntry> findByUserAndEntryDate(User user, LocalDate date);

    @Query("SELECT new com.healthtracker.backend.dto.AnalyticsResponse$MoodStats(" +
           "m.entryDate, CAST(AVG(m.moodRating) AS int)) " +
           "FROM MoodEntry m " +
           "WHERE m.user.id = :userId " +
           "AND FUNCTION('MONTH', m.entryDate) = :month " +
           "AND FUNCTION('YEAR', m.entryDate) = :year " +
           "GROUP BY m.entryDate")
    List<AnalyticsResponse.MoodStats> findMonthlyMoodStats(@Param("userId") Long userId,
                                                            @Param("month") int month,
                                                            @Param("year") int year);
}
