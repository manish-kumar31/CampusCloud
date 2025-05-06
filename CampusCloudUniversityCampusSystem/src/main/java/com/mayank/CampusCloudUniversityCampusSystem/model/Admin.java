package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter

public class Admin {

    @Id
    private long id;
    private String name;
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
