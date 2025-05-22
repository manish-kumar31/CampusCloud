package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private AuthService authService;

    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentProfile(
            @PathVariable String studentId,
            @RequestHeader("Authorization") String authHeader) {

        try {
            String token = authHeader.replace("Bearer ", "");
            authService.verifyTokenAndCheckAccess(token, studentId);

            Student student = studentRepository.findByUnivId(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}