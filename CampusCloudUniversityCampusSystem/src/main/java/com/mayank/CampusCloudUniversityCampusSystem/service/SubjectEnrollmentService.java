package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import com.mayank.CampusCloudUniversityCampusSystem.repository.FacultyRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectEnrollmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class SubjectEnrollmentService {

    @Autowired
    private SubjectEnrollmentRepo subjectRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private FacultyRepo facultyRepo;


    public SubjectEnrollment createEnrollmentWithAllStudents(EnrollmentRequest request) {

        Faculty faculty = facultyRepo.findFacultyByUnivId(request.getUnivId()).orElseThrow();


        List<Student> allStudents = studentRepo.findAll();


        SubjectEnrollment enrollment = new SubjectEnrollment();
        enrollment.setSubjectName(request.getSubjectName());
        enrollment.setSubjectCode(request.getSubjectCode());
        enrollment.setCredits(request.getCredits());
        enrollment.setFaculty(faculty);
        enrollment.setEnrolledStudents(allStudents);

        return subjectRepo.save(enrollment);
    }

}