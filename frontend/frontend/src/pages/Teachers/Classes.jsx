// ClassSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { ClassContainer, SidebarContainer, Content, ClassHeader, ClassList, ClassItem } 
from '../../styles/ClassesStyles'; 


const ClassSection = () => {
  return (
    <ClassContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ClassHeader>Classes</ClassHeader>
        <ClassList>
        </ClassList>
      </Content>
    </ClassContainer>
  );
};

export default ClassSection;
