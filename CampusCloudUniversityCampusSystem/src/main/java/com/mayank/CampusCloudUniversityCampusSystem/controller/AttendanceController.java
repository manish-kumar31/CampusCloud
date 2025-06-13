package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<Attendance> markAttendance(@RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markAttendance(request));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Attendance>> markBulkAttendance(@RequestBody BulkAttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markBulkAttendance(request));
    }

    @GetMapping("/student/{univId}")
    public ResponseEntity<List<Attendance>> getAttendanceByStudent(@PathVariable String univId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByStudent(univId));
    }

    @GetMapping("/faculty/{univId}")
    public ResponseEntity<List<Attendance>> getAttendanceByFaculty(@PathVariable String univId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByFaculty(univId));
    }

    @GetMapping("/subject/{subjectId}/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceBySubjectAndDate(
            @PathVariable Long subjectId,
            @PathVariable String date) {
        return ResponseEntity.ok(attendanceService.getAttendanceBySubjectAndDate(
                subjectId,
                LocalDate.parse(date)
        ));
    }

    @GetMapping("/stats/subject/{subjectId}")
    public ResponseEntity<AttendanceStats> getSubjectAttendanceStats(
            @PathVariable Long subjectId) {
        return ResponseEntity.ok(attendanceService.getSubjectAttendanceStats(subjectId));
    }

    @GetMapping("/stats/student/{studentUnivId}/subject/{subjectId}")
    public ResponseEntity<AttendanceStats> getStudentAttendanceStats(
            @PathVariable String studentUnivId,
            @PathVariable Long subjectId) {
        return ResponseEntity.ok(attendanceService.getStudentAttendanceStats(
                studentUnivId,
                subjectId
        ));
    }
}