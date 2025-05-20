package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.LoginRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.FacultyRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private FacultyRepo facultyRepo;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse httpResponse // To set headers
    ) {
        Map<String, Object> response = new HashMap<>();

        // Parse DOB (password)
        LocalDate dob;
        try {
            dob = LocalDate.parse(loginRequest.getPassword()); // "YYYY-MM-DD"
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Invalid date format (use YYYY-MM-DD)");
            return ResponseEntity.badRequest().body(response);
        }

        String dobString = dob.toString();

        // Check STUDENT login
        Student student = studentRepo.findByUnivId(loginRequest.getUsername());
        if (student != null && dobString.equals(student.getPassword())) {
            response.put("status", "success");
            response.put("role", "STUDENT");
            response.put("userId", student.getId());
            response.put("redirect", "/student/dashboard");
            response.put("name", student.getName());
            return ResponseEntity.ok(response);
        }

        // Check FACULTY login
        Faculty faculty = facultyRepo.findByUnivId(loginRequest.getUsername()).orElse(null);
        if (faculty != null && dobString.equals(faculty.getPassword())) {
            response.put("status", "success");
            response.put("role", "FACULTY"); // This is correct
            response.put("userId", faculty.getId());
            response.put("redirect", "/teacher/dashboard"); // Ensure this path exists in your React Router
            response.put("name", faculty.getName());

            // Header is being set correctly
            httpResponse.setHeader("x-faculty-univid", faculty.getUnivId());

            return ResponseEntity.ok(response);
        }

        // If no match
        response.put("status", "error");
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}