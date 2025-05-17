package com.mayank.CampusCloudUniversityCampusSystem.repository;
import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepo extends JpaRepository<Faculty,Long> {

    Optional<Faculty>  findFacultyByUnivId(String univId);

}
