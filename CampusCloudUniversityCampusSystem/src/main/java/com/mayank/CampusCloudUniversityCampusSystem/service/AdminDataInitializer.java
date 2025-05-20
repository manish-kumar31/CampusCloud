package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Admin;
import com.mayank.CampusCloudUniversityCampusSystem.repository.AdminRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepo adminRepository;


    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setName("Mayank Singh Rawat");
            admin.setDob(LocalDate.of(2004, 7, 2));
            admin.setUnivId("mayankdai101997@gmail.com");

            admin.setPassword(admin.getDob().toString());

            adminRepository.save(admin);
            System.out.println("Admin data inserted.");
        }
    }
}
