import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
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
  FormRow,
  FormLabel,
} from "../../styles/ClassesStyles";

const SubjectEnrollment = () => {
  const [enrollmentData, setEnrollmentData] = useState({
    subjectName: "",
    subjectCode: "",
    credits: 0,
    univId: "",
  });
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch existing enrollments on component mount
  useEffect(() => {
    const fetchEnrollments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/enrollments"
        );
        setEnrollments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData((prev) => ({
      ...prev,
      [name]: name === "credits" ? parseInt(value) || 0 : value,
    }));
  };

  const handleEnrollAll = async (e) => {
    e.preventDefault();

    if (
      !enrollmentData.subjectName.trim() ||
      !enrollmentData.subjectCode.trim() ||
      !enrollmentData.univId.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/enrollments/create-for-all",
        enrollmentData
      );
      setEnrollments([...enrollments, response.data]);
      setEnrollmentData({
        subjectName: "",
        subjectCode: "",
        credits: 0,
        univId: "",
      });
      setError(null);
      setSuccess("Enrollment created successfully!");
      setTimeout(() => setSuccess(null), 3000);
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
          <ClassesHeader>Subject Enrollment</ClassesHeader>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <AddClassForm onSubmit={handleEnrollAll}>
            <FormRow>
              <FormLabel>Subject Name:</FormLabel>
              <AddClassInput
                type="text"
                name="subjectName"
                placeholder="Subject Name"
                value={enrollmentData.subjectName}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </FormRow>

            <FormRow>
              <FormLabel>Subject Code:</FormLabel>
              <AddClassInput
                type="text"
                name="subjectCode"
                placeholder="Subject Code"
                value={enrollmentData.subjectCode}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </FormRow>

            <FormRow>
              <FormLabel>Credits:</FormLabel>
              <AddClassInput
                type="number"
                name="credits"
                placeholder="Credits"
                value={enrollmentData.credits}
                onChange={handleInputChange}
                disabled={isLoading}
                min="0"
              />
            </FormRow>

            <FormRow>
              <FormLabel>University ID:</FormLabel>
              <AddClassInput
                type="text"
                name="univId"
                placeholder="Faculty University ID"
                value={enrollmentData.univId}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </FormRow>

            <AddClassButton type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Enroll All Students"}
            </AddClassButton>
          </AddClassForm>

          {isLoading && !enrollments.length ? (
            <div>Loading enrollments...</div>
          ) : (
            <ClassList>
              {enrollments.map((enrollment) => (
                <ClassItem key={enrollment.id}>
                  <SubjectInfo>
                    <strong>
                      {enrollment.subjectName} ({enrollment.subjectCode})
                    </strong>
                    <div>Credits: {enrollment.credits}</div>
                    <div>Faculty ID: {enrollment.univId}</div>
                    <div>
                      Students Enrolled: {enrollment.students?.length || 0}
                    </div>
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

export default SubjectEnrollment;
