package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.security.auth.Subject;
import java.util.Optional;

@Repository
public interface SubjectEnrollmentRepo extends JpaRepository <SubjectEnrollment,Long> {
    Optional<SubjectEnrollment> findBySubjectCode(String subjectCode);
}
