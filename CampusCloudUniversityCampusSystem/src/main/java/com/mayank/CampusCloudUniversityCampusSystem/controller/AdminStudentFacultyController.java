package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.service.AdminStudentFacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AdminStudentFacultyController {

    @Autowired
    private AdminStudentFacultyService service;
    @PostMapping(value = "/uploadStudentDetails",consumes = "multipart/form-data")
    public ResponseEntity<Integer> uploadDetailsOfStudentsBulk (
            @RequestPart("file") MultipartFile file) throws IOException {

        return  ResponseEntity.ok(service.uploadDetailsOfStudentsBulk(file));
    }

    @PostMapping ("/uploadStudent")
    public ResponseEntity <?> uploadStudentDetail (@RequestBody Student student){

        try {
            Student student1 = service.uploadStudentDetail(student);
            return new ResponseEntity <> (student1, HttpStatus.OK);
        }
        catch (Exception e){
            return new  ResponseEntity <> (e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping ("/uploadFaculty")
    public ResponseEntity <?> uploadFacultyDetail (@RequestBody Faculty faculty){

        try {
            Faculty faculty1 = service.uploadFacultyDetail (faculty);
            return new ResponseEntity <> (faculty1,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity <>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/student/{rollNo}")
    public ResponseEntity <?> getStudentByRollNo (@PathVariable String rollNo){

        try {
             Optional <Student> student = service.getStudentByRollNo(rollNo);
            return new ResponseEntity <>(student,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping ("/student/{rollNo}")
    public ResponseEntity <?> updateStudent(@PathVariable String rollNo,@RequestPart Student student){

        try {
            Student student1 = service.updateStudent (rollNo,student);
            return new ResponseEntity <>(student1,HttpStatus.OK);
        }
        catch (Exception e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/student/{rollNo}")
    public ResponseEntity <String> deleteStudent (@PathVariable String rollNo){

        if (service.deleteStudent(rollNo)){
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Student not found",HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/faculty/{rollNo}")
    public ResponseEntity <?> getFacultyByUnivId (@PathVariable String univId){

        try {
            Optional <Faculty> faculty  = service.getFacultyByUnivId(univId);
            return new ResponseEntity <>(faculty,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping ("/faculty/{rollNo}")
    public ResponseEntity <?> updateFaculty (@PathVariable String univId,@RequestPart Faculty faculty){

        try {
            Faculty faculty1 = service.updateFaculty (univId,faculty);
            return new ResponseEntity <>(faculty1,HttpStatus.OK);
        }
        catch (Exception e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/faculty/{rollNo}")
    public ResponseEntity <String> deleteFaculty (@PathVariable String univId){

        if (service.deleteFaculty(univId)){
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }

        else{
            return new ResponseEntity<>("Faculty not found",HttpStatus.NOT_FOUND);
        }

    }

}
