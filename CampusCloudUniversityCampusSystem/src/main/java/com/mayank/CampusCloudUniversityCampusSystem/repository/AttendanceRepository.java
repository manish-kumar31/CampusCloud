package com.mayank.CampusCloudUniversityCampusSystem.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import  com.mayank.CampusCloudUniversityCampusSystem.model.Attendance;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentUnivId(String studentUnivId);
    List<Attendance> findBySubjectId(Long subjectId);
    List<Attendance> findByFacultyUnivId(String facultyUnivId);
    List<Attendance> findByStudentUnivIdAndSubjectId(String studentUnivId, Long subjectId);

    Optional<Attendance> findByStudentUnivIdAndSubjectIdAndDate(String studentUnivId, Long subjectId, LocalDate date);

    @Query("SELECT COUNT(DISTINCT a.date) FROM Attendance a WHERE a.subject.id = ?1")
    long countDistinctDatesBySubjectId(Long subjectId);

    @Query("SELECT COUNT(DISTINCT a.student.univId) FROM Attendance a WHERE a.subject.id = ?1")
    long countDistinctStudentsBySubjectId(Long subjectId);

    List<Attendance> findBySubjectIdAndDate(Long subjectId, LocalDate date);
}