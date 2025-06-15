package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private  AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceRequest request) {
        try {
            Attendance result = attendanceService.markAttendance(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> markBulkAttendance(@RequestBody BulkAttendanceRequest request) {
        try {
            List<Attendance> result = attendanceService.markBulkAttendance(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{emailId}")
    public ResponseEntity<?> getAttendanceByStudent(@PathVariable String emailId) {
        try {
            List<Attendance> result = attendanceService.getAttendanceByStudent(emailId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/faculty/{emailId}")
    public ResponseEntity<?> getAttendanceByFaculty(@PathVariable String emailId) {
        try {
            List<Attendance> result = attendanceService.getAttendanceByFaculty(emailId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/subject/{subjectId}/date/{date}")
    public ResponseEntity<?> getAttendanceBySubjectAndDate(
            @PathVariable Long subjectId,
            @PathVariable String date) {
        try {
            List<Attendance> result = attendanceService.getAttendanceBySubjectAndDate(
                    subjectId, LocalDate.parse(date));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/stats/subject/{subjectId}")
    public ResponseEntity<?> getSubjectAttendanceStats(@PathVariable Long subjectId) {
        try {
            AttendanceStats result = attendanceService.getSubjectAttendanceStats(subjectId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/stats/student/{emailId}/subject/{subjectId}")
    public ResponseEntity<?> getStudentAttendanceStats(
            @PathVariable String emailId,
            @PathVariable Long subjectId) {
        try {
            AttendanceStats result = attendanceService.getStudentAttendanceStats(emailId, subjectId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}