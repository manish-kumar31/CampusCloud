package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.Course;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  CourseRepo extends JpaRepository <Course,Long> {

    Optional<Course> findByCourseCode(String courseCode);
}
