package com.healthtracker.backend.controller;

import com.healthtracker.backend.dto.RegisterRequest;
import com.healthtracker.backend.entity.User;
import com.healthtracker.backend.repository.UserRepository;
import com.healthtracker.backend.util.JwtUtil;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/me")
    public User getCurrentUser(@RequestHeader("Authorization") String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(jwt);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @PutMapping("/me")
    public String updateCurrentUser(@RequestHeader("Authorization") String token,
                                    @RequestBody RegisterRequest updated) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        user.setName(updated.getName());
        user.setAge(updated.getAge());
        user.setHeight(updated.getHeight());
        user.setWeight(updated.getWeight());

        userRepository.save(user);
        return "User updated successfully!";
    }
}