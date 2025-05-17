package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Course;
import com.mayank.CampusCloudUniversityCampusSystem.model.CourseEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseEnrollmentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.CourseRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class CourseEnrollmentService {

    @Autowired
    StudentRepo studentRepo;
    @Autowired
    CourseRepo courseRepo;

    @Autowired
    CourseEnrollmentRepo courseEnrollmentRepo;


    public Integer enrollStudents(EnrollmentRequest request) {


        List<Student> students = studentRepo.findAll();
        Optional<Course> courseCode = courseRepo.findByCourseCode(request.getCourseCode());

        if (courseCode.isEmpty()){
            throw new RuntimeException("Course not found with code : " + request.getCourseCode());
        }

        Course course = courseCode.get();

        List <CourseEnrollment> enrollments  = new ArrayList<>();

        for (Student student: students){
            CourseEnrollment enrollment = new CourseEnrollment();

            enrollment.setStudent(student);
            enrollment.setCourse (course);
            enrollment.setCourseCode(course.getCourseCode());
            enrollments.add(enrollment);
        }

        courseEnrollmentRepo.saveAll(enrollments);
        return enrollments.size();

    }
}
