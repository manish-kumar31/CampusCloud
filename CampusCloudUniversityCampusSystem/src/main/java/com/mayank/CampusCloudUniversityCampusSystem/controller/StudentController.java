package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.checkerframework.checker.units.qual.C;
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

    @GetMapping("/{univId}")
    public ResponseEntity<Student> getStudentProfile(
            @PathVariable String univId,
            @RequestHeader("Authorization") String authHeader) {

//        String token = authHeader.replace("Bearer ", "");
//        if (!tokenService.isValidToken(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }

        Student student = studentRepository.findByUnivId(univId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return ResponseEntity.ok(student);
    }
}