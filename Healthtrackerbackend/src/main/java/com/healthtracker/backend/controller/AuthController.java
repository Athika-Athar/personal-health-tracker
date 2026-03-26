package com.healthtracker.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.healthtracker.backend.dto.AuthResponse;
import com.healthtracker.backend.dto.LoginRequest;
import com.healthtracker.backend.dto.RegisterRequest;
import com.healthtracker.backend.entity.User;
import com.healthtracker.backend.repository.UserRepository;
import com.healthtracker.backend.service.CustomUserDetailsService;
import com.healthtracker.backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(UserRepository userRepository,
                          AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder,
                          CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getAge(),
                request.getHeight(),
                request.getWeight()
        );

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    // ✅ LOGIN (IMPORTANT FIX HERE)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        // ✅ load user details
        UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.getEmail());

        // ✅ generate JWT
        String token = jwtUtil.generateToken(userDetails);

        // ✅ get full user from DB
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ RETURN TOKEN + USER ID
        return ResponseEntity.ok(
                new AuthResponse(token, user.getId())
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}