package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Subject;
import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectEnrollmentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class SubjectEnrollmentService {

    @Autowired
    StudentRepo studentRepo;
    @Autowired
    SubjectRepo subjectRepo;

    @Autowired
    SubjectEnrollmentRepo subjectEnrollmentRepo;


    public Integer enrollStudents(EnrollmentRequest request) {


        List<Student> students = studentRepo.findAll();
        Optional<Subject> courseCode = subjectRepo.findBySubjectCode(request.getSubjectCode());

        if (courseCode.isEmpty()){
            throw new RuntimeException("Course not found with code : " + request.getSubjectCode());
        }

        Subject subject = courseCode.get();

        List <SubjectEnrollment> enrollments  = new ArrayList<>();

        for (Student student: students){
            SubjectEnrollment enrollment = new SubjectEnrollment();

            enrollment.setStudent(student);
            enrollment.setSubject(subject);
            enrollment.setSubjectCode(subject.getSubjectCode());
            enrollments.add(enrollment);
        }

        subjectEnrollmentRepo.saveAll(enrollments);
        return enrollments.size();

    }
}
