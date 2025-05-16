package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Course;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CourseService {

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    Course course;
    public Course addCourse(EnrollmentRequest request) {

        course.setCourseCode(request.getCourseCode());
        course.setCourseName(request.getCourseName());
        course.setCredits(request.getCredits());

        return courseRepo.save(course);
    }
}
