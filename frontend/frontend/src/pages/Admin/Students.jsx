import React, { useState } from "react";
import Sidebar from "./Sidebar";
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
  FileUploadContainer,
  FormSection,
  FormRow,
  ActionButton,
  ButtonGroup,
  FormSelect,
} from "../../styles/StudentsStyles";

const Students = () => {
  // State for form inputs - only required fields initialized
  const [studentData, setStudentData] = useState({
    name: "",
    emailId: "",
    univId: "",
    // Other fields will be added as needed
  });

  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("single");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add single student - only sending required fields
  const handleAddStudent = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!studentData.name || !studentData.emailId) {
      alert("Name and Email are required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/uploadStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentData.name,
          emailId: studentData.emailId,
          univId: studentData.univId || null,
          // Only include fields that have values
          ...(studentData.subject && { subject: studentData.subject }),
          ...(studentData.branch && { branch: studentData.branch }),
          ...(studentData.semester && { semester: studentData.semester }),
          ...(studentData.year && { year: studentData.year }),
          ...(studentData.rollNo && { rollNo: studentData.rollNo }),
          ...(studentData.dob && { dob: studentData.dob }),
          ...(studentData.contactNo && { contactNo: studentData.contactNo }),
          ...(studentData.address && { address: studentData.address }),
          ...(studentData.gender && { gender: studentData.gender }),
          ...(studentData.nationality && {
            nationality: studentData.nationality,
          }),
          ...(studentData.bloodGroup && { bloodGroup: studentData.bloodGroup }),
          ...(studentData.parentContactNo && {
            parentContactNo: studentData.parentContactNo,
          }),
          ...(studentData.parentName && { parentName: studentData.parentName }),
          ...(studentData.parentOccupation && {
            parentOccupation: studentData.parentOccupation,
          }),
        }),
      });

      if (!response.ok) throw new Error("Failed to add student");

      const newStudent = await response.json();
      setStudents([...students, newStudent]);

      // Reset form but keep optional fields blank
      setStudentData({
        name: "",
        emailId: "",
        univId: "",
        // Clear other fields if needed
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert(error.message);
    }
  };

  // Handle bulk upload - remains the same
  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/uploadStudentDetails",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Bulk upload failed");

      const count = await response.json();
      alert(`Successfully uploaded ${count} students`);
      // You might want to refresh the student list here
    } catch (error) {
      console.error("Error in bulk upload:", error);
      alert(error.message);
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Student Management</StudentsHeader>

          <ButtonGroup>
            <ActionButton
              active={activeTab === "single"}
              onClick={() => setActiveTab("single")}
            >
              Add Single Student
            </ActionButton>
            <ActionButton
              active={activeTab === "bulk"}
              onClick={() => setActiveTab("bulk")}
            >
              Bulk Upload
            </ActionButton>
          </ButtonGroup>

          {activeTab === "single" ? (
            <AddStudentForm onSubmit={handleAddStudent}>
              <FormSection>
                <h3>Required Information</h3>
                <FormRow>
                  <div>
                    <label>Full Name *</label>
                    <AddStudentInput
                      type="text"
                      name="name"
                      value={studentData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Email *</label>
                    <AddStudentInput
                      type="email"
                      name="emailId"
                      value={studentData.emailId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </FormRow>

                <FormRow>
                  {/* <div>
                    <label>University ID</label>
                    <AddStudentInput
                      type="text"
                      name="univId"
                      value={studentData.univId}
                      onChange={handleInputChange}
                    />
                  </div> */}
                  <div>
                    <label>Roll Number</label>
                    <AddStudentInput
                      type="text"
                      name="rollNo"
                      value={studentData.rollNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormRow>
              </FormSection>

              <FormSection>
                <h3>Academic Information</h3>
                <FormRow>
                  <div>
                    <label>Course</label>
                    <AddStudentInput
                      type="text"
                      name="subject"
                      value={studentData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Branch</label>
                    <AddStudentInput
                      type="text"
                      name="branch"
                      value={studentData.branch}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormRow>

                <FormRow>
                  <div>
                    <label>Semester</label>
                    <AddStudentInput
                      type="number"
                      name="semester"
                      value={studentData.semester}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div>
                    <label>Year</label>
                    <AddStudentInput
                      type="number"
                      name="year"
                      value={studentData.year}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </FormRow>
              </FormSection>

              <FormSection>
                <h3>Personal Information</h3>
                <FormRow>
                  <div>
                    <label>Date of Birth</label>
                    <AddStudentInput
                      type="date"
                      name="dob"
                      value={studentData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Gender</label>
                    <FormSelect
                      name="gender"
                      value={studentData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </FormSelect>
                  </div>
                </FormRow>

                <FormRow>
                  <div>
                    <label>Contact Number</label>
                    <AddStudentInput
                      type="tel"
                      name="contactNo"
                      value={studentData.contactNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Address</label>
                    <AddStudentInput
                      type="text"
                      name="address"
                      value={studentData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </FormRow>
              </FormSection>

              <AddStudentButton type="submit">Add Student</AddStudentButton>
            </AddStudentForm>
          ) : (
            <FileUploadContainer>
              <h3>Bulk Upload Students</h3>
              <form onSubmit={handleBulkUpload}>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".csv"
                  required
                />
                <p>Upload CSV file with student details</p>
                <AddStudentButton type="submit">Upload File</AddStudentButton>
              </form>
            </FileUploadContainer>
          )}

          <StudentList>
            <h3>Student Records</h3>
            {students.length > 0 ? (
              students.map((student, index) => (
                <StudentItem key={index}>
                  <strong>Name:</strong> {student.name} <br />
                  <strong>Email:</strong> {student.emailId} <br />
                  <strong>University ID:</strong> {student.univId || "N/A"}{" "}
                  <br />
                  <strong>Course:</strong> {student.subject || "N/A"} <br />
                  <strong>Roll no:</strong> {student.rollNo || "N/A"}
                </StudentItem>
              ))
            ) : (
              <p>No students found</p>
            )}
          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
