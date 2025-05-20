package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.repository.AttendanceRepository;
import com.mayank.CampusCloudUniversityCampusSystem.repository.FacultyRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectEnrollmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class AttendanceService {

    @Autowired
    private  AttendanceRepository attendanceRepo;
    @Autowired
    private  StudentRepo studentRepo;
    @Autowired
    private SubjectEnrollmentRepo subjectEnrollmentRepo;
    @Autowired
    private  FacultyRepo facultyRepo;

    // Get all students for a faculty's subject
    public List<Student> getStudentsForFaculty(String facultyUnivId) {
        Faculty faculty = facultyRepo.findByUnivId(facultyUnivId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Get the single subject assigned to this faculty
        SubjectEnrollment subject = subjectEnrollmentRepo.findByFaculty_UnivId(faculty.getUnivId())
                .orElseThrow(() -> new RuntimeException("No subject assigned to this faculty"));

        return subject.getEnrolledStudents();
    }

    // Mark attendance for multiple students
    @Transactional
    public List<Attendance> markAttendance(List<AttendanceRequest> requests, String facultyUnivId) {
        Faculty faculty = facultyRepo.findByUnivId(facultyUnivId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Get the faculty's single subject
        SubjectEnrollment subject = subjectEnrollmentRepo.findByFaculty_UnivId(faculty.getUnivId())
                .orElseThrow(() -> new RuntimeException("No subject assigned to this faculty"));

        return requests.stream().map(request -> {
            Student student = studentRepo.findById(request.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Verify student is enrolled in this subject
            if (!subject.getEnrolledStudents().contains(student)) {
                throw new RuntimeException("Student not enrolled in this subject");
            }

            // Check for duplicate attendance
            if (attendanceRepo.existsByStudentAndSubjectEnrollmentAndDate(
                    student, subject, request.getDate())) {
                throw new RuntimeException("Attendance already marked for this student on " + request.getDate());
            }

            // Create and save attendance
            Attendance attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setSubjectEnrollment(subject);
            attendance.setFaculty(faculty);
            attendance.setDate(request.getDate());
            attendance.setPresent(request.isPresent());

            return attendanceRepo.save(attendance);
        }).collect(Collectors.toList());
    }

    // Other methods remain same as previous...
}