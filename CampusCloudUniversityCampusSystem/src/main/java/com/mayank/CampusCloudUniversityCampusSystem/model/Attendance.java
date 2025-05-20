package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_enrollment_id", nullable = false)
    private SubjectEnrollment subjectEnrollment;

    private LocalDate date;
    private boolean isPresent;

    // Many-to-One with Faculty (who marked the attendance)
    @ManyToOne
    @JoinColumn(name = "faculty_univ_id", nullable = false)
    private Faculty faculty;
}