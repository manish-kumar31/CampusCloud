package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student,Integer> {

    Optional<Student> findByRollNo(String rollNo);


}
