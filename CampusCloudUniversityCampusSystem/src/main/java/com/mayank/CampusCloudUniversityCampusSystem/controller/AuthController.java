package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired private StudentRepo studentRepo;
    @Autowired private FacultyRepo facultyRepo;
    @Autowired private AdminRepo adminRepo;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            LocalDate dob = LocalDate.parse(loginRequest.getPassword());
            String dobString = dob.toString();

            // Check STUDENT
            Student student = studentRepo.findByUnivId(loginRequest.getUsername());
            if (student != null && dobString.equals(student.getPassword())) {
                return buildSuccessResponse("STUDENT", student.getId(),
                        "/student/dashboard", student.getName(), student.getUnivId());
            }

            // Check FACULTY
            Faculty faculty = facultyRepo.findByUnivId(loginRequest.getUsername()).orElse(null);
            if (faculty != null && dobString.equals(faculty.getPassword())) {
                return buildSuccessResponse("FACULTY", faculty.getId(),
                        "/teacher/dashboard", faculty.getName(), faculty.getUnivId());
            }

            // Check ADMIN
            Admin admin = adminRepo.findByUnivId(loginRequest.getUsername()).orElse(null);
            if (admin != null && dobString.equals(admin.getPassword())) {
                return buildSuccessResponse("ADMIN", admin.getId(),
                        "/admin/dashboard", admin.getName(), admin.getUnivId());
            }

            return buildErrorResponse("Invalid credentials");

        } catch (Exception e) {
            return buildErrorResponse("Invalid date format (use YYYY-MM-DD)");
        }
    }

    private ResponseEntity<Map<String, Object>> buildSuccessResponse(
            String role, Long userId, String redirect, String name, String univId) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("role", role);
        response.put("userId", userId);
        response.put("redirect", redirect);
        response.put("name", name);

        return ResponseEntity.ok()
                .header("x-" + role.toLowerCase() + "-univId", univId)
                .body(response);
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}