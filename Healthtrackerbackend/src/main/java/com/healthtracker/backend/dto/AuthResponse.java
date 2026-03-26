package com.healthtracker.backend.dto;

public class AuthResponse {

    private String token;
    private Long id;   // ✅ userId added

    public AuthResponse() {}

    public AuthResponse(String token, Long id) {
        this.token = token;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setId(Long id) {
        this.id = id;
    }
}