package com.mayank.CampusCloudUniversityCampusSystem.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data

public class CourseEnrollment {

    private String courseCode;
    private List<Student> students;
}
