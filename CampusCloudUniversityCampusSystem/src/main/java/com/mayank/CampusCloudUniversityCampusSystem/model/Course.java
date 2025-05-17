package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.boot.registry.selector.StrategyRegistration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Course {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private String courseCode;
    private int credits;

    @OneToMany(mappedBy =  "course", cascade =  CascadeType.ALL)
    private List<CourseEnrollment> enrollments = new ArrayList<>();

}
