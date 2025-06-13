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

    // ✅ Fetch student by Firebase UID, secured by verifying token
    @GetMapping("/{firebaseUid}")
    public ResponseEntity<?> getStudentProfile(
            @PathVariable String firebaseUid,
            @RequestHeader("Authorization") String authHeader) {

        try {
            String token = authHeader.replace("Bearer ", "");

            // ✅ Verify token, get user, and check access to this Firebase UID
            authService.verifyTokenAndCheckAccess(token, firebaseUid);

            // ✅ Fetch student details by Firebase UID
            Student student = studentRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("Student not found with provided Firebase UID"));

            return ResponseEntity.ok(student);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
