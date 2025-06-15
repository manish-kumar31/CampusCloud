package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private FacultyRepo facultyRepo;

    @Autowired
    private SubjectEnrollmentRepo subjectRepo;

    @Transactional
    public Attendance markAttendance(AttendanceRequest request) {
        // Basic validation
        if (request == null || request.getStudentEmail() == null || request.getFacultyEmail() == null) {
            throw new RuntimeException("Invalid request");
        }

        // Find student
        Student student = studentRepo.findByEmail(request.getStudentEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Find faculty
        Faculty faculty = facultyRepo.findByEmail(request.getFacultyEmail())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Find subject
        SubjectEnrollment subject = subjectRepo.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        // Validate relationships
        if (!subject.getFaculty().getEmail().equals(faculty.getEmail())) {
            throw new RuntimeException("Faculty doesn't teach this subject");
        }

        if (!subject.getEnrolledStudents().contains(student)) {
            throw new RuntimeException("Student not enrolled in subject");
        }

        // Set date
        LocalDate date = request.getDate() != null ? request.getDate() : LocalDate.now();

        // Check if attendance already exists
        Optional<Attendance> existing = attendanceRepo.findByStudentEmailAndSubjectIdAndDate(
                student.getEmail(), subject.getId(), date);

        if (existing.isPresent()) {
            throw new RuntimeException("Attendance already marked");
        }

        // Create new attendance
        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setFaculty(faculty);
        attendance.setSubject(subject);
        attendance.setDate(date);
        attendance.setPresent(request.isPresent());
        attendance.setRemarks(request.getRemarks());

        return attendanceRepo.save(attendance);
    }

    @Transactional
    public List<Attendance> markBulkAttendance(BulkAttendanceRequest request) {
        // Basic validation
        if (request == null || request.getFacultyEmail() == null || request.getStudentAttendances() == null) {
            throw new RuntimeException("Invalid request");
        }

        // Find faculty and subject
        Faculty faculty = facultyRepo.findByEmail(request.getFacultyEmail())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        SubjectEnrollment subject = subjectRepo.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        // Validate faculty teaches subject
        if (!subject.getFaculty().getEmail().equals(faculty.getEmail())) {
            throw new RuntimeException("Faculty doesn't teach this subject");
        }

        LocalDate date = request.getDate() != null ? request.getDate() : LocalDate.now();
        List<Attendance> results = new ArrayList<>();

        for (BulkAttendanceRequest.StudentAttendance sa : request.getStudentAttendances()) {

            Student student = studentRepo.findByEmail(sa.getStudentEmail())
                    .orElseThrow(() -> new RuntimeException("Student not found: " + sa.getStudentEmail()));

            if (!subject.getEnrolledStudents().contains(student)) {
                throw new RuntimeException("Student not enrolled: " + student.getEmail());
            }

            // Check existing attendance
            Optional<Attendance> existing = attendanceRepo.findByStudentEmailAndSubjectIdAndDate(
                    student.getEmail(), subject.getId(), date);

            Attendance attendance;
            if (existing.isPresent()) {
                attendance = existing.get();
                attendance.setPresent(sa.isPresent());
                attendance.setRemarks(sa.getRemarks());
            } else {
                attendance = new Attendance();
                attendance.setStudent(student);
                attendance.setFaculty(faculty);
                attendance.setSubject(subject);
                attendance.setDate(date);
                attendance.setPresent(sa.isPresent());
                attendance.setRemarks(sa.getRemarks());
            }

            results.add(attendanceRepo.save(attendance));
        }

        return results;
    }

    public List<Attendance> getAttendanceBySubjectAndDate(Long subjectId, LocalDate date) {
        if (subjectId == null || date == null) {
            throw new RuntimeException("Subject ID and date required");
        }
        return attendanceRepo.findBySubjectIdAndDate(subjectId, date);
    }

    public AttendanceStats getSubjectAttendanceStats(Long subjectId) {
        if (subjectId == null) {
            throw new RuntimeException("Subject ID required");
        }

        List<Attendance> attendances = attendanceRepo.findBySubjectId(subjectId);
        if (attendances.isEmpty()) {
            return new AttendanceStats();
        }

        long totalClasses = attendanceRepo.countDistinctDatesBySubjectId(subjectId);
        long presentCount = 0;

        for (Attendance a : attendances) {
            if (a.isPresent()) presentCount++;
        }

        double percentage = totalClasses > 0 ? (presentCount * 100.0 / totalClasses) : 0;
        percentage = Math.round(percentage * 100) / 100.0;

        AttendanceStats stats = new AttendanceStats();
        stats.setTotalClasses((int)totalClasses);
        stats.setTotalPresent((int)presentCount);
        stats.setAttendancePercentage(percentage);

        return stats;
    }

    public List<Attendance> getAttendanceByStudent(String studentEmail) {
        if (studentEmail == null) {
            throw new RuntimeException("Student email required");
        }
        return attendanceRepo.findByStudentEmail(studentEmail);
    }

    public List<Attendance> getAttendanceByFaculty(String emailId) {
        if (emailId == null) {
            throw new RuntimeException("Faculty email required");
        }
        return attendanceRepo.findByFacultyEmail(emailId);
    }

    public AttendanceStats getStudentAttendanceStats(String emailId, Long subjectId) {
        if (emailId == null || subjectId == null) {
            throw new RuntimeException("Student email and Subject ID required");
        }

        List<Attendance> attendances = attendanceRepo.findByStudentEmailAndSubjectId(emailId, subjectId);
        long totalClasses = attendanceRepo.countDistinctDatesBySubjectId(subjectId);
        long presentCount = 0;

        for (Attendance a : attendances) {
            if (a.isPresent()) presentCount++;
        }

        double percentage = totalClasses > 0 ? (presentCount * 100.0 / totalClasses) : 0;
        percentage = Math.round(percentage * 100) / 100.0;

        AttendanceStats stats = new AttendanceStats();
        stats.setTotalClasses((int)totalClasses);
        stats.setTotalPresent((int)presentCount);
        stats.setAttendancePercentage(percentage);

        return stats;
    }
}