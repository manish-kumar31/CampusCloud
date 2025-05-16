package com.mayank.CampusCloudUniversityCampusSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor

public class EnrollmentRequest {

    private String courseName;
    private String courseCode;
    private int credits;

}
