package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.service.SubjectEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
public class SubjectEnrollmentController {

    @Autowired
    private SubjectEnrollmentService enrollmentService;


    @PostMapping("/create-for-all")
    public ResponseEntity<?> createForAllStudents(@RequestBody EnrollmentRequest request) {
        try {
            return ResponseEntity.ok(enrollmentService.createEnrollmentWithAllStudents(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}