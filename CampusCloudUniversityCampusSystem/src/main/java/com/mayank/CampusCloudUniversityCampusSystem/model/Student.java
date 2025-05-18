package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String course;
    private String branch;
    private int semester;
    private int year;
    @Column(nullable = true)
    private String enrollmentCode;
    @Column(nullable = true)
    private boolean enrollmentCompleted;

    @Column(nullable = true)
    private String rollNo;

    @Column(nullable = true)
    private LocalDate dob;

    private Long contactNo;

    private String address;
    private String gender;
    @Column(nullable = true)
    private String nationality;
    @Column(nullable = true)
    private String bloodGroup;

    @Column(nullable = true)
    private Long parentContactNo;
    @Column(nullable = true)
    private String parentName;
    @Column(nullable = true)
    private String parentOccupation;

    @Email
    private String emailId;

    @Column(nullable = true)
    private String univId;

    @Lob
    @Column (nullable = true,updatable = true)
    private byte[] stuImage;

    @Column(nullable = true)
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<SubjectEnrollment> enrollments = new ArrayList<>();
}
