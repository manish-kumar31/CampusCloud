package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Component
public interface SubjectEnrollmentRepo extends JpaRepository<SubjectEnrollment, Long> {
    // Find the single subject assigned to a faculty
    Optional<SubjectEnrollment> findByFaculty_UnivId(String univId);

}