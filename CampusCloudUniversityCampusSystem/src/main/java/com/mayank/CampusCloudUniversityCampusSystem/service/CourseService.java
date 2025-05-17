package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Course;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class CourseService {

    @Autowired
    CourseRepo courseRepo;


    public Course addCourse(EnrollmentRequest request) {

        Course course = new Course();
        course.setCourseName(request.getCourseName());
        course.setCourseCode(request.getCourseCode());
        course.setCredits(request.getCredits());

        return courseRepo.save(course);
    }
}
