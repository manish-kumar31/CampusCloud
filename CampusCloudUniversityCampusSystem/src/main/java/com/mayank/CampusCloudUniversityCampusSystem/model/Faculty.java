    package com.mayank.CampusCloudUniversityCampusSystem.model;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Email;
    import lombok.*;

    import java.time.LocalDate;

    @Data
    @Entity
    @NoArgsConstructor
    @AllArgsConstructor

    public class Faculty {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;

        @Column(nullable = true)
        private String univId;

        private String department;
        @Email
        private String emailId;
        private LocalDate dob;
        private long contactNo;
        private String address;
        private String gender;
        @Column(nullable = true)
        private String nationality;
        @Column(nullable = true)
        private String bloodGroup;

        @Lob
        @Column(nullable = true)
        private byte[] image;

        @OneToOne (mappedBy = "faculty")
        private SubjectEnrollment request;

        @Column(nullable = true)
        private String password;

    }
