package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.service.SubjectEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SubjectEnrollmentController {

    @Autowired
    private SubjectEnrollmentService service;


    @PostMapping("/setEnrollments")
    public ResponseEntity<?> setEnrollments (@RequestBody SubjectEnrollment request){

        try {
            return new ResponseEntity<>(service.setEnrollments(request), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping
    public ResponseEntity<?> getEnrollments(String subjectCode) {
        try {
            Optional<SubjectEnrollment> subjects = service.getEnrollments(subjectCode);
            return new ResponseEntity<>(subjects, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
