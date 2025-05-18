package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Subject {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private String subjectCode;
    private int credits;

    @OneToMany(mappedBy =  "subject", cascade =  CascadeType.ALL)
    private List<SubjectEnrollment> enrollments = new ArrayList<>();

}
