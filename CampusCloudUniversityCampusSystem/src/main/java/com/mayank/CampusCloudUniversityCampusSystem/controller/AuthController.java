package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.LoginRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.AdminRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.FacultyRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private FacultyRepo teacherRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();


        LocalDate dobInput = LocalDate.parse(loginRequest.getPassword());  // expects "YYYY-MM-DD"
        String dobString = dobInput.toString();
        Student student = studentRepo.findByUnivId(loginRequest.getUsername());
        if (student != null && dobString.equals(student.getPassword())) {
            response.put("status", "success");
            response.put("role", "STUDENT");
            response.put("userId", student.getId());
            response.put("redirect", "/student/dashboard");
            response.put("name", student.getName());
            return ResponseEntity.ok(response);
        }


        Faculty faculty = teacherRepo.findByUnivId(loginRequest.getUsername());
        if (faculty != null && dobString.equals(student.getPassword())) {
            response.put("status", "success");
            response.put("role", "TEACHER");
            response.put("userId", faculty.getId());
            response.put("redirect", "/teacher/dashboard");
            response.put("name", faculty.getName());
            return ResponseEntity.ok(response);
        }



        response.put("status", "error");
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}