package com.mayank.CampusCloudUniversityCampusSystem.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AttendanceRequest{



    private Long studentId;


    private LocalDate date;

    private boolean isPresent;
}