package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class SubjectEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subjectCode;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

}
