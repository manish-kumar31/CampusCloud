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
          <TeachersHeader>Faculty</TeachersHeader>
          <AddTeacherForm >
            <AddTeacherInput
              type="text"
              placeholder="Name"
    
            />
            <AddTeacherInput
              type="email"
              placeholder="Mail"
            
            />
            <AddTeacherInput
              type="text"
              placeholder="Subject"
             
            />
            <AddTeacherButton type="submit">Add Faculty</AddTeacherButton>
          </AddTeacherForm>
          <TeacherList>
           
          </TeacherList>
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;
