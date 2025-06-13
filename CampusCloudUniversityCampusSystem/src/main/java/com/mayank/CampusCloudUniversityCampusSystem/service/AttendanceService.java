package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.*;
import com.mayank.CampusCloudUniversityCampusSystem.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepo studentRepository;
    private final FacultyRepo facultyRepository;
    private final SubjectEnrollmentRepo subjectEnrollmentRepository;

    @Transactional
    public Attendance markAttendance(AttendanceRequest request) {
        // Validate input
        if (request == null || request.getStudentUnivId() == null || request.getFacultyUnivId() == null) {
            throw new IllegalArgumentException("Invalid attendance request");
        }

        Student student = studentRepository.findByUnivId(request.getStudentUnivId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + request.getStudentUnivId()));

        Faculty faculty = facultyRepository.findFacultyByUnivId(request.getFacultyUnivId())
                .orElseThrow(() -> new EntityNotFoundException("Faculty not found with ID: " + request.getFacultyUnivId()));

        SubjectEnrollment subject = subjectEnrollmentRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + request.getSubjectId()));

        validateFacultySubject(faculty, subject);
        validateStudentEnrollment(student, subject);

        LocalDate attendanceDate = request.getDate() != null ? request.getDate() : LocalDate.now();

        // Check for existing attendance
        attendanceRepository.findByStudentUnivIdAndSubjectIdAndDate(
                student.getUnivId(), subject.getId(), attendanceDate
        ).ifPresent(a -> {
            throw new IllegalStateException("Attendance already exists for student " +
                    student.getUnivId() + " in subject " + subject.getId() + " on " + attendanceDate);
        });

        // Create new attendance record
        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setFaculty(faculty);
        attendance.setSubject(subject);
        attendance.setDate(attendanceDate);
        attendance.setPresent(request.isPresent());
        attendance.setRemarks(request.getRemarks());

        return attendanceRepository.save(attendance);
    }

    @Transactional
    public List<Attendance> markBulkAttendance(BulkAttendanceRequest request) {
        // Validate input
        if (request == null || request.getFacultyUnivId() == null || request.getStudentAttendances() == null) {
            throw new IllegalArgumentException("Invalid bulk attendance request");
        }

        Faculty faculty = facultyRepository.findFacultyByUnivId(request.getFacultyUnivId())
                .orElseThrow(() -> new EntityNotFoundException("Faculty not found with ID: " + request.getFacultyUnivId()));

        SubjectEnrollment subject = subjectEnrollmentRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + request.getSubjectId()));

        validateFacultySubject(faculty, subject);

        LocalDate attendanceDate = request.getDate() != null ? request.getDate() : LocalDate.now();

        return request.getStudentAttendances().parallelStream()
                .map(sa -> {
                    Student student = studentRepository.findByUnivId(sa.getStudentUnivId())
                            .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + sa.getStudentUnivId()));

                    validateStudentEnrollment(student, subject);

                    // Check for existing attendance
                    Optional<Attendance> existing = attendanceRepository.findByStudentUnivIdAndSubjectIdAndDate(
                            student.getUnivId(), subject.getId(), attendanceDate
                    );

                    if (existing.isPresent()) {
                        Attendance att = existing.get();
                        att.setPresent(sa.isPresent());
                        att.setRemarks(sa.getRemarks());
                        return attendanceRepository.save(att);
                    } else {
                        Attendance newAttendance = new Attendance();
                        newAttendance.setStudent(student);
                        newAttendance.setFaculty(faculty);
                        newAttendance.setSubject(subject);
                        newAttendance.setDate(attendanceDate);
                        newAttendance.setPresent(sa.isPresent());
                        newAttendance.setRemarks(sa.getRemarks());
                        return attendanceRepository.save(newAttendance);
                    }
                })
                .collect(Collectors.toList());
    }

    public List<Attendance> getAttendanceBySubjectAndDate(Long subjectId, LocalDate date) {
        if (subjectId == null || date == null) {
            throw new IllegalArgumentException("Subject ID and date must not be null");
        }
        return attendanceRepository.findBySubjectIdAndDate(subjectId, date);
    }

    public AttendanceStats getSubjectAttendanceStats(Long subjectId) {
        if (subjectId == null) {
            throw new IllegalArgumentException("Subject ID must not be null");
        }

        List<Attendance> attendances = attendanceRepository.findBySubjectId(subjectId);
        if (attendances.isEmpty()) {
            return new AttendanceStats(); // Return empty stats instead of throwing exception
        }

        long totalClasses = attendanceRepository.countDistinctDatesBySubjectId(subjectId);
        long presentCount = attendances.stream().filter(Attendance::isPresent).count();
        double attendancePercentage = totalClasses > 0 ?
                ((double) presentCount / totalClasses * 100) : 0;

        Map<LocalDate, Integer> dailyAttendance = attendances.stream()
                .collect(Collectors.groupingBy(
                        Attendance::getDate,
                        Collectors.summingInt(a -> a.isPresent() ? 1 : 0)
                ));

        AttendanceStats stats = new AttendanceStats();
        stats.setTotalClasses((int) totalClasses);
        stats.setTotalPresent((int) presentCount);
        stats.setAttendancePercentage(Math.round(attendancePercentage * 100.0) / 100.0);
        stats.setDailyAttendance(dailyAttendance);

        return stats;
    }

    public AttendanceStats getStudentAttendanceStats(String studentUnivId, Long subjectId) {
        if (studentUnivId == null || subjectId == null) {
            throw new IllegalArgumentException("Student ID and Subject ID must not be null");
        }

        List<Attendance> attendances = attendanceRepository.findByStudentUnivIdAndSubjectId(studentUnivId, subjectId);
        long totalClasses = attendanceRepository.countDistinctDatesBySubjectId(subjectId);
        long presentCount = attendances.stream().filter(Attendance::isPresent).count();
        double attendancePercentage = totalClasses > 0 ?
                ((double) presentCount / totalClasses * 100) : 0;

        AttendanceStats stats = new AttendanceStats();
        stats.setTotalClasses((int) totalClasses);
        stats.setTotalPresent((int) presentCount);
        stats.setAttendancePercentage(Math.round(attendancePercentage * 100.0) / 100.0);

        return stats;
    }

    public List<Attendance> getAttendanceByStudent(String studentUnivId) {
        if (studentUnivId == null) {
            throw new IllegalArgumentException("Student ID must not be null");
        }
        return attendanceRepository.findByStudentUnivId(studentUnivId);
    }

    public List<Attendance> getAttendanceByFaculty(String facultyUnivId) {
        if (facultyUnivId == null) {
            throw new IllegalArgumentException("Faculty ID must not be null");
        }
        return attendanceRepository.findByFacultyUnivId(facultyUnivId);
    }

    private void validateFacultySubject(Faculty faculty, SubjectEnrollment subject) {
        if (!subject.getFaculty().getUnivId().equals(faculty.getUnivId())) {
            throw new IllegalStateException("Faculty " + faculty.getUnivId() +
                    " is not assigned to subject " + subject.getId());
        }
    }

    private void validateStudentEnrollment(Student student, SubjectEnrollment subject) {
        if (!subject.getEnrolledStudents().contains(student)) {
            throw new IllegalStateException("Student " + student.getUnivId() +
                    " is not enrolled in subject " + subject.getId());
        }
    }
}