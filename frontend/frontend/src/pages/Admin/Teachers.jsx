// Teachers.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  TeachersContainer,
  Content,
  TeachersContent,
  TeachersHeader,
  TeacherList,
  TeacherItem,
  AddTeacherForm,
  AddTeacherInput,
  AddTeacherButton,
} from '../../styles/TeachersStyles'; // Import styled components from TeachersStyles.js

const Teachers = () => {
  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>Teachers</TeachersHeader>
          <AddTeacherForm >
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher name"
    
            />
            <AddTeacherInput
              type="email"
              placeholder="Enter teacher email"
            
            />
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher subject"
             
            />
            <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
          </AddTeacherForm>
          <TeacherList>
           
          </TeacherList>
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;
