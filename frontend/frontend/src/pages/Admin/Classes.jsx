import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassesHeader,
  ClassList,
  ClassItem,
  AddClassForm,
  AddClassInput,
  AddClassButton,
} from '../../styles/ClassesStyles';

const Classes = () => {
  // State to store the class name input and the list of classes
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);

  // Handler for adding a new class
  const handleAddClass = (e) => {
    e.preventDefault();

    if (newClassName.trim()) {
      setClasses((prevClasses) => [
        ...prevClasses,
        { name: newClassName }, // Add the new class to the list
      ]);
      setNewClassName(''); // Clear the input field
    }
  };

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassesHeader>Classes</ClassesHeader>
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <AddClassButton type="submit">Add Class</AddClassButton>
          </AddClassForm>
          <ClassList>
            {/* Ensure that classes is an array before mapping over it */}
            {Array.isArray(classes) && classes.map((classItem, index) => (
              <ClassItem key={index}>{classItem.name}</ClassItem>
            ))}
          </ClassList>
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Classes;
