package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter

public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(nullable = true)
    private String univId;

    private String department;
    private String emailId;
    private String dob;
    private long contactNo;
    private String address;
    private String gender;
    private String nationality;
    private String bloodGroup;

    @Lob
    private byte[] image;

}
