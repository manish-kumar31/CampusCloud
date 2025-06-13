package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubjectEnrollmentRepo extends JpaRepository<SubjectEnrollment, Long> {
    List<SubjectEnrollment> findByFaculty_UnivId(String univId);
}
