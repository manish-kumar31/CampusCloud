package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {

    Optional<Student> findByRollNo(String rollNo);
    Student findByEmailId(String emailId);
    Student findByUnivId(String univId);

}
