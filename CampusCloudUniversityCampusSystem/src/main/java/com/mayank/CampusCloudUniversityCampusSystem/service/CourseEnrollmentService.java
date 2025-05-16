package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Course;
import com.mayank.CampusCloudUniversityCampusSystem.model.CourseEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseEnrollmentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class CourseEnrollmentService {

    @Autowired
    StudentRepo StudentRepo;
    @Autowired
    CourseRepo courseRepo;

    @Autowired
    CourseEnrollmentRepo courseEnrollmentRepo;

    @Autowired
    CourseEnrollment courseEnrollment;

    public Integer enrollStudents(EnrollmentRequest request) {


        List<Student> students = StudentRepo.findAll();
        Optional<Course> courseCode = courseRepo.findByCourseCode(request.getCourseCode());

        courseEnrollment.setStudents(students);
        courseEnrollment.setCourseCode(String.valueOf(courseCode));
        courseEnrollmentRepo.save(courseEnrollment);
        return students.size();

    }
    
}
