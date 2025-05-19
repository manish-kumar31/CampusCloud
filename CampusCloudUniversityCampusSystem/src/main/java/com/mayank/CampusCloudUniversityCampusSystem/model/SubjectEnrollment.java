package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter

public class SubjectEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subjectName;
    private String subjectCode;
    private int credits;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "enrollment_students",
            joinColumns = @JoinColumn(name = "enrollment_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))
    private List<Student> students = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

}
