import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  StudentName,
  CheckboxLabel,
  Divider,
  SubmitButton,
  ErrorMessage,
  LoadingMessage,
  EmptyMessage,
} from "../../styles/AttendanceStyles";

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [subjectEnrollmentId, setSubjectEnrollmentId] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Better date formatting
  const [loading, setLoading] = useState({
    students: false,
    submission: false,
  });
  const [error, setError] = useState(null);

  // Get auth headers once
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "X-Faculty-UnivId": localStorage.getItem("facultyUnivId"), // Changed from univId to facultyUnivId
  });

  // Fetch students for the teacher's subject
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading((prev) => ({ ...prev, students: true }));
        setError(null);

        const response = await axios.get(
          "http://localhost:8080/api/subject-enrollment/my-subject",
          { headers: getAuthHeaders() }
        );

        if (!response.data?.students?.length) {
          throw new Error("No students found for this subject");
        }

        setStudents(response.data.students);
        setSubjectEnrollmentId(response.data.id);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setStudents([]);
      } finally {
        setLoading((prev) => ({ ...prev, students: false }));
      }
    };

    fetchStudents();
  }, []);

  const handleStatusChange = (studentId, isPresent) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        studentId,
        subjectEnrollmentId,
        date,
        isPresent,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading((prev) => ({ ...prev, submission: true }));
      setError(null);

      const attendanceRequests = Object.values(attendanceData);

      if (!attendanceRequests.length) {
        throw new Error("Please mark attendance for at least one student");
      }

      await axios.post(
        "http://localhost:8080/api/attendance/mark",
        attendanceRequests,
        { headers: getAuthHeaders() }
      );

      alert("Attendance submitted successfully!");
      setAttendanceData({});
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Attendance submission error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  // Render states
  if (loading.students)
    return <LoadingMessage>Loading students...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!students.length)
    return <EmptyMessage>No students available for attendance</EmptyMessage>;

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Mark Attendance - {new Date(date).toLocaleDateString()}
          </AttendanceHeader>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setAttendanceData({});
            }}
            style={{ marginBottom: "20px", padding: "8px" }}
          />

          <AttendanceList>
            {students.map((student, index) => (
              <React.Fragment key={student.id}>
                <AttendanceItem>
                  <StudentName>
                    {student.name} ({student.rollNo})
                  </StudentName>

                  <CheckboxLabel>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={attendanceData[student.id]?.isPresent === true}
                      onChange={() => handleStatusChange(student.id, true)}
                    />
                    Present
                  </CheckboxLabel>

                  <CheckboxLabel>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={attendanceData[student.id]?.isPresent === false}
                      onChange={() => handleStatusChange(student.id, false)}
                    />
                    Absent
                  </CheckboxLabel>
                </AttendanceItem>

                {index !== students.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </AttendanceList>

          <SubmitButton
            onClick={handleSubmit}
            disabled={
              loading.submission || Object.keys(attendanceData).length === 0
            }
          >
            {loading.submission ? "Submitting..." : "Submit Attendance"}
          </SubmitButton>

          {error && (
            <ErrorMessage style={{ marginTop: "15px" }}>{error}</ErrorMessage>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
