package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Subject;
import com.mayank.CampusCloudUniversityCampusSystem.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/subject")

public class SubjectController {

    @Autowired
    private SubjectService service;

    @Autowired
    Subject subject;
    @PostMapping("/addSubject")
    public  ResponseEntity <?> addCourse(@RequestBody EnrollmentRequest request){


        try {
            return new ResponseEntity<>(service.addCourse(request), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<?> getAllSubjects() {
        try {
            List<Subject> subjects = service.getAllSubjects();
            return new ResponseEntity<>(subjects, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
