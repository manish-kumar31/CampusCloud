import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentList,
  StudentItem,
  AddStudentForm,
  AddStudentInput,
  AddStudentButton,
} from '../../styles/StudentsStyles';

const Students = () => {
  // State to store form inputs and the list of students
  const [newStudentName, setNewStudentName] = useState('');
  const [newRegistrationNumber, setNewRegistrationNumber] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [students, setStudents] = useState([]);

  // Handler for adding a new student
  const handleAddStudent = (e) => {
    e.preventDefault();

    // Check if the inputs are not empty
    if (newStudentName.trim() && newRegistrationNumber.trim() && newGrade.trim()) {
      // Add the new student to the students array
      setStudents((prevStudents) => [
        ...prevStudents,
        {
          name: newStudentName,
          registrationNumber: newRegistrationNumber,
          grade: newGrade,
        },
      ]);

      // Clear the input fields after adding the student
      setNewStudentName('');
      setNewRegistrationNumber('');
      setNewGrade('');
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <AddStudentForm onSubmit={handleAddStudent}>
            <AddStudentInput
              type="text"
              placeholder="Enter student name"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter registration number"
              value={newRegistrationNumber}
              onChange={(e) => setNewRegistrationNumber(e.target.value)}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter grade"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
            />
            <AddStudentButton type="submit">Add Student</AddStudentButton>
          </AddStudentForm>
          <StudentList>
            {/* Render the list of students */}
            {Array.isArray(students) && students.map((student, index) => (
              <StudentItem key={index}>
                <strong>Name:</strong> {student.name} <br />
                <strong>Registration Number:</strong> {student.registrationNumber} <br />
                <strong>Grade:</strong> {student.grade}
              </StudentItem>
            ))}
          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
