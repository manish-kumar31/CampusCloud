package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectEnrollmentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.service.SubjectEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/enrollments")
public class SubjectEnrollmentController {

    @Autowired
    private SubjectEnrollmentService enrollmentService;

    @Autowired
    private SubjectEnrollmentRepo subjectEnrollmentRepo;

    @PostMapping("/create-for-all")
    public ResponseEntity<?> createForAllStudents(@RequestBody EnrollmentRequest request) {
        try {
            return ResponseEntity.ok(enrollmentService.createEnrollmentWithAllStudents(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/faculty")
    public ResponseEntity<?> getSubjectsByFaculty(@RequestHeader("Authorization") String authHeader) {
        try {
            String facultyEmail = extractFacultyEmailFromToken(authHeader);
            System.out.println("Extracted faculty email: " + facultyEmail); // Debug log

            List<SubjectEnrollment> subjects = subjectEnrollmentRepo.findByFaculty_UnivId(facultyEmail);
            System.out.println("Found subjects count: " + subjects.size()); // Debug log

            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            System.err.println("Error fetching subjects: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error fetching subjects: " + e.getMessage());
        }
    }

    private String extractFacultyEmailFromToken(String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);

            // Use email instead of UID to match your database records
            String facultyEmail = decodedToken.getEmail();

            if (facultyEmail == null || facultyEmail.isEmpty()) {
                throw new RuntimeException("Faculty email not found in token");
            }

            return facultyEmail.toLowerCase(); // Ensure case-insensitive matching
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired Firebase token: " + e.getMessage());
        }
    }
}