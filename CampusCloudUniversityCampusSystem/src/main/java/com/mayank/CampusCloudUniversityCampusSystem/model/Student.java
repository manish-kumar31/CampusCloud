package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;

import java.time.LocalDate;

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
    private String enrollmentCode;
    private boolean enrollmentCompleted;

    @Column(nullable = true)
    private String rollNo;


    private LocalDate dob;

    private Long contactNo;

    private String address;
    private String gender;
    private String nationality;
    private String bloodGroup;

    private Long parentContactNo;
    private String parentName;
    private String parentOccupation;

    @Email
    private String emailId;

    @Column(nullable = true)
    private String univId;

    @Lob
    @Column (nullable = true,updatable = true)
    private byte[] stuImage;


}
