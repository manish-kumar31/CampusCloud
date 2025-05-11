package com.mayank.CampusCloudUniversityCampusSystem.controller;


import com.mayank.CampusCloudUniversityCampusSystem.model.QRCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api")
public class StudentController {

    @Autowired
    QRCode qrCode;

    @RequestMapping("/mark-attendance")
    public ResponseEntity<?> markAttendance (@RequestParam String token){

        String []parts = token.split("_");

        long currentSeconds = Instant.now().getEpochSecond();
        long qrTimeStamp = Long.parseLong(parts[0]);

        if (currentSeconds - qrTimeStamp > 60){
            return new ResponseEntity<>("Qr code expired", HttpStatus.BAD_REQUEST);
        }

        if (qrCode.getRandomId() != parts[2]){
            return new ResponseEntity<>("Invalid Qr Code",HttpStatus.NOT_FOUND);
        }





    }


}
