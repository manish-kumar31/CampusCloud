package com.mayank.CampusCloudUniversityCampusSystem.model;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.model.SubjectEnrollment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// Remove the @PrePersist annotation since we're now handling dates explicitly
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_univ_id", referencedColumnName = "univ_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "faculty_univ_id", referencedColumnName = "univ_id")
    private Faculty faculty;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private SubjectEnrollment subject;

    private LocalDate date;
    private boolean present;
    private String remarks;

    // Removed the @PrePersist method
}