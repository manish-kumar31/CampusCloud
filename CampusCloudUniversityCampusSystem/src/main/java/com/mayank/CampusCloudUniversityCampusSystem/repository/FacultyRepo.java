package com.mayank.CampusCloudUniversityCampusSystem.repository;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepo extends JpaRepository<Faculty,Integer> {
}
