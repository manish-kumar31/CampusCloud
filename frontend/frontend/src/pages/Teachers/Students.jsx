// StudentSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { StudentsContainer, Content, StudentsContent, StudentsHeader, StudentList, StudentItem, AddStudentForm, AddStudentInput, 
  AddStudentButton } from '../../styles/StudentsStyles';

const StudentSection = () => {

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <StudentList>
          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default StudentSection;
