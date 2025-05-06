package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Faculty;
import com.mayank.CampusCloudUniversityCampusSystem.model.Student;
import com.mayank.CampusCloudUniversityCampusSystem.model.StudentCsvRepresentation;
import com.mayank.CampusCloudUniversityCampusSystem.repository.FacultyRepo;
import com.mayank.CampusCloudUniversityCampusSystem.repository.StudentRepo;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Builder
public class AdminStudentFacultyService {

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private FacultyRepo facultyRepo;
    public Integer uploadDetailsOfStudentsBulk (MultipartFile file) throws IOException {

        Set<Student> students = parseCsv(file);
        List<Student> savedStudents = studentRepo.saveAll(students);

        for (Student stu : savedStudents){
            String rollNo = generateRollNo(stu.getYear(), stu.getBranch(), stu.getId());
            stu.setRollNo(rollNo);
        }

        studentRepo.saveAll(savedStudents);
        return students.size();

    }

    private String generateRollNo(int year, String branch, Long id) {

        return String.valueOf(year) + branch + String.valueOf(id);
    }

    public Set <Student> parseCsv (MultipartFile file) throws IOException {

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))){

            HeaderColumnNameMappingStrategy <StudentCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();

            strategy.setType(StudentCsvRepresentation.class);
            CsvToBean<StudentCsvRepresentation> csvToBean  = new CsvToBeanBuilder<StudentCsvRepresentation>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            return csvToBean.parse()
                    .stream()
                    .map(csv -> Student.builder()
                            .name(csv.getName())
                            .course(csv.getCourse())
                            .branch(csv.getBranch())
                            .semester(csv.getSemester())
                            .year(csv.getYear())
                            .enrollmentCode(csv.getEnrollmentCode())
                            .enrollmentCompleted(csv.isEnrollmentCompleted())
                            .rollNo(String.valueOf(csv.getRollNo()))
                            .dob(csv.getDob())
                            .contactNo(csv.getContactNo())
                            .address(csv.getAddress())
                            .gender(csv.getGender())
                            .nationality(csv.getNationality())
                            .bloodGroup(csv.getBloodGroup())
                            .parentContactNo(csv.getParentContactNo())
                            .parentName(csv.getParentName())
                            .parentOccupation(csv.getParentOccupation())
                            .emailId(csv.getEmailId())
                            .stuImage(csv.getStuImage())
                            .univId(generateUnivId(csv.getName(), csv.getContactNo()))
                            .build()
                    )
                    .collect(Collectors.toSet());
        }
    }



    public String generateUnivId (String name,long contactNo){

        long lastDigit = contactNo % 10;
        long secondLastDigit = (contactNo / 10) % 10;
        long thirdLastDigit = (contactNo / 100) % 10;

        String []nameParts = name.split("\\s+");

        String firstName = nameParts[0];

        return reverse(firstName) + String.valueOf(thirdLastDigit) + String.valueOf(secondLastDigit) + String.valueOf(lastDigit)
                + "@myuniv.edu";

    }

    public String reverse (String name){

        return new StringBuilder(name).reverse().toString();
    }

    public Student uploadStudentDetail(Student student) {

       Student savedStudent =  studentRepo.save(student); // So that uniqueId is generated first before generating RollNo
       String rollNo = generateRollNo(savedStudent.getYear(), savedStudent.getBranch(), savedStudent.getId());
       savedStudent.setRollNo(rollNo);
       savedStudent.setUnivId(generateUnivId(savedStudent.getName(),savedStudent.getContactNo()));

       return studentRepo.save(savedStudent);

    }



    public Faculty uploadFacultyDetail(Faculty faculty) {

        Faculty savedFaculty =  facultyRepo.save(faculty);
        savedFaculty.setUnivId(generateUnivId(savedFaculty.getName(),savedFaculty.getContactNo()));
        return facultyRepo.save(savedFaculty);

    }

    public Optional<Student> getStudentByRollNo(String rollNo){

        return studentRepo.findByRollNo(rollNo);

    }

    public Student updateStudent(String rollNo, Student updatedStudent) {

        Optional<Student> optionalStudent = studentRepo.findByRollNo(rollNo);

        if (optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();

            existingStudent.setName(updatedStudent.getName());
            existingStudent.setCourse(updatedStudent.getCourse());
            existingStudent.setBranch(updatedStudent.getBranch());
            existingStudent.setSemester(updatedStudent.getSemester());
            existingStudent.setYear(updatedStudent.getYear());
            existingStudent.setEnrollmentCode(updatedStudent.getEnrollmentCode());
            existingStudent.setEnrollmentCompleted(updatedStudent.isEnrollmentCompleted());
            existingStudent.setRollNo(updatedStudent.getRollNo());
            existingStudent.setDob(updatedStudent.getDob());
            existingStudent.setContactNo(updatedStudent.getContactNo());
            existingStudent.setAddress(updatedStudent.getAddress());
            existingStudent.setGender(updatedStudent.getGender());
            existingStudent.setNationality(updatedStudent.getNationality());
            existingStudent.setBloodGroup(updatedStudent.getBloodGroup());
            existingStudent.setParentContactNo(updatedStudent.getParentContactNo());
            existingStudent.setParentName(updatedStudent.getParentName());
            existingStudent.setParentOccupation(updatedStudent.getParentOccupation());
            existingStudent.setEmailId(updatedStudent.getEmailId());
            existingStudent.setUnivId(updatedStudent.getUnivId());

            return studentRepo.save(existingStudent);
        }
        else{
            return null;
        }
    }

    public boolean deleteStudent(String rollNo) {

        Optional<Student> optionalStudent = getStudentByRollNo(rollNo);

        if (optionalStudent.isPresent()){
            Student existingStudent = optionalStudent.get();
            studentRepo.delete(existingStudent);
            return true;
        }
        else{
            return false;
        }

    }

}
