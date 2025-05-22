package com.mayank.CampusCloudUniversityCampusSystem.model;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

// SubjectEnrollment.java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private String subjectCode;
    private int credits;

    @ManyToOne
    @JoinColumn(name = "faculty_univ_id", referencedColumnName = "univ_id")
    private Faculty faculty;

    @ManyToMany
    @JoinTable(
            name = "subject_student_enrollment",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "student_univ_id", referencedColumnName = "univ_id")
    )
    private List<Student> enrolledStudents = new ArrayList<>();
}