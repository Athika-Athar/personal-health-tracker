package com.healthtracker.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medications")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String dosage;
    private String time;

    // ✅ NEW FIELD (to track if medicine is taken)
    private boolean taken = false;

    // relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Medication() {}

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDosage() {
        return dosage;
    }

    public String getTime() {
        return time;
    }

    public boolean isTaken() {   // ✅ getter for taken
        return taken;
    }

    public User getUser() {
        return user;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setTaken(boolean taken) {   // ✅ setter
        this.taken = taken;
    }

    public void setUser(User user) {
        this.user = user;
    }
}