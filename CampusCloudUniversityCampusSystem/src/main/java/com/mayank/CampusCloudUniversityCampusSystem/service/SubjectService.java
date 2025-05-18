package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Subject;
import com.mayank.CampusCloudUniversityCampusSystem.model.EnrollmentRequest;
import com.mayank.CampusCloudUniversityCampusSystem.repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class SubjectService {

    @Autowired
    SubjectRepo subjectRepo;


    public Subject addCourse(EnrollmentRequest request) {

        Subject subject = new Subject();
        subject.setSubjectName(request.getSubjectName());
        subject.setSubjectCode(request.getSubjectCode());
        subject.setCredits(request.getCredits());

        return subjectRepo.save(subject);
    }
}
