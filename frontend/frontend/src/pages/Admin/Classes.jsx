import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  SubjectInfo,
} from '../../styles/ClassesStyles';

const Subjects = () => {
  const [newSubject, setNewSubject] = useState({
    subjectName: '',
    subjectCode: '',
    credits: 0
  });
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/subject');
        setSubjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({
      ...prev,
      [name]: name === 'credits' ? parseInt(value) || 0 : value
    }));
  };

  // Handler for adding a new subject
  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (!newSubject.subjectName.trim() || !newSubject.subjectCode.trim()) {
      setError('Subject name and code are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/subject/addSubject', newSubject);
      setSubjects([...subjects, response.data]);
      setNewSubject({
        subjectName: '',
        subjectCode: '',
        credits: 0
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassesHeader>Subjects</ClassesHeader>
          {error && <div className="error-message">{error}</div>}
          <AddClassForm onSubmit={handleAddSubject}>
            <AddClassInput
              type="text"
              name="subjectName"
              placeholder="Subject Name"
              value={newSubject.subjectName}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <AddClassInput
              type="text"
              name="subjectCode"
              placeholder="Subject Code"
              value={newSubject.subjectCode}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <AddClassInput
              type="number"
              name="credits"
              placeholder="Credits"
              value={newSubject.credits}
              onChange={handleInputChange}
              disabled={isLoading}
              min="0"
            />
            <AddClassButton type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Subject'}
            </AddClassButton>
          </AddClassForm>
          {isLoading && !subjects.length ? (
            <div>Loading subjects...</div>
          ) : (
            <ClassList>
              {subjects.map((subject) => (
                <ClassItem key={subject.id}>
                  <SubjectInfo>
                    <strong>{subject.subjectName}</strong>
                    <div>Code: {subject.subjectCode}</div>
                    <div>Credits: {subject.credits}</div>
                  </SubjectInfo>
                </ClassItem>
              ))}
            </ClassList>
          )}
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Subjects;