package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.Attendance;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByStudentAndSubjectEnrollmentAndDate(Student student, SubjectEnrollment subjectEnrollment, LocalDate date);
    List<Attendance> findByStudentId(Long studentId);
    List<Attendance> findBySubjectEnrollmentId(Long subjectEnrollmentId);

    List<Attendance> findByFaculty_UnivId(String univId);
}