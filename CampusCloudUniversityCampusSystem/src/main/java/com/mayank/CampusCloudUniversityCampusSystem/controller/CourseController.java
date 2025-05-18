package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.service.CourseService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/course")

public class CourseController {

    @Autowired
    private CourseService service;

    @PostMapping("/addCourse")
    public  ResponseEntity <?> addCourse(@RequestBody EnrollmentRequest request){


        try {
            return new ResponseEntity<>(service.addCourse(request), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
