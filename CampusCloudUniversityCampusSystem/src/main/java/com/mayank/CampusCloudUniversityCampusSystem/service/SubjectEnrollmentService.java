package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectEnrollmentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class SubjectEnrollmentService {

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    SubjectEnrollmentRepo subjectRepo;


    public Integer setEnrollments(SubjectEnrollment request) {


        List<Student> students = studentRepo.findAll();

        String subjectName = request.getSubjectName();
        String subjectCode = request.getSubjectCode();
        int subjectCredits = request.getCredits();

        List <SubjectEnrollment> enrollments  = new ArrayList<>();

        for (Student student: students){
            SubjectEnrollment enrollment = new SubjectEnrollment();

            enrollment.setSubjectName(subjectName);
            enrollment.setSubjectCode(subjectCode);
            enrollment.setCredits(subjectCredits);
            enrollment.setStudents(students);
            enrollment.setFaculty(request.getFaculty());
        }

        subjectRepo.saveAll(enrollments);
        return enrollments.size();

    }


    public Optional<SubjectEnrollment> getEnrollments(String subjectCode) {

     return  subjectRepo.findBySubjectCode(subjectCode);

        

    }
}
