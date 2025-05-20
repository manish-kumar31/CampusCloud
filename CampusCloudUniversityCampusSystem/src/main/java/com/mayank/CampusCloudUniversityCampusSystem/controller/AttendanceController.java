package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.AttendanceRequest;
import com.mayank.CampusCloudUniversityCampusSystem.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    // Get all students for faculty's subject
    @GetMapping("/my-students")
    public ResponseEntity<?> getFacultyStudents(@RequestHeader("X-Faculty-UnivId") String facultyUnivId) {
        try {
            return ResponseEntity.ok(attendanceService.getStudentsForFaculty(facultyUnivId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Mark attendance for students
    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(
            @RequestBody List<AttendanceRequest> requests,
            @RequestHeader("X-Faculty-UnivId") String facultyUnivId) {
        try {
            return ResponseEntity.ok(attendanceService.markAttendance(requests, facultyUnivId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Other endpoints remain same...
}