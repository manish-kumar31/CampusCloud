package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.repository.AttendanceRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AttendanceController {

    @Autowired
    AttendanceRepo attendanceRepo;

    @Autowired
    StudentRepo studentRepo;


//    @PostMapping ("/markAttendance")
//    public ResponseEntity<?> markAttendance (){
//
//    }
}
