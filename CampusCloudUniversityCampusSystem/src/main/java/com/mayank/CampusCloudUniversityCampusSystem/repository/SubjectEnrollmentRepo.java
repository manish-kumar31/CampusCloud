package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SubjectEnrollmentRepo extends JpaRepository<SubjectEnrollment, Long> {

    @Query("SELECT s FROM SubjectEnrollment s JOIN s.enrolledStudents e WHERE e.email = :email")
    List<SubjectEnrollment> findByStudent_Email(String email);
    List<SubjectEnrollment> findByFaculty_Email(String email);
}