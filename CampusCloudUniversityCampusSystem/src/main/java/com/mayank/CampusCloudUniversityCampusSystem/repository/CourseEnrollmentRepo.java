package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.CourseEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseEnrollmentRepo extends JpaRepository <CourseEnrollment,Integer> {
}
