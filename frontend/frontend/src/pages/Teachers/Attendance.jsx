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
  DatePicker,
} from "../../styles/AttendanceStyles";

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [subjectEnrollmentId, setSubjectEnrollmentId] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState({
    students: false,
    submission: false,
  });
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading((prev) => ({ ...prev, students: true }));
      setError(null);

      const facultyUnivId =
        localStorage.getItem("facultyUnivId") || "dfd333@univ.edu";

      const response = await axios.get(
        "http://localhost:8080/api/attendance/my-students",
        {
          headers: {
            "X-Faculty-UnivId": facultyUnivId,
          },
        }
      );

      if (!response?.data || !Array.isArray(response.data)) {
        throw new Error("Invalid students data format");
      }

      if (response.data.length === 0) {
        throw new Error("No students found for this faculty.");
      }

      setStudents(response.data);
      if (response.data[0]?.subjectEnrollmentId) {
        setSubjectEnrollmentId(response.data[0].subjectEnrollmentId);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch students"
      );
      setStudents([]);
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  };

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
      if (attendanceRequests.length === 0) {
        throw new Error("Please mark attendance for at least one student");
      }

      const facultyUnivId =
        localStorage.getItem("facultyUnivId") || "dfd333@univ.edu";

      await axios.post(
        "http://localhost:8080/api/attendance/mark",
        attendanceRequests,
        {
          headers: {
            "X-Faculty-UnivId": facultyUnivId,
          },
        }
      );

      alert("Attendance submitted successfully!");
      setAttendanceData({});
    } catch (err) {
      console.error("Error submitting attendance:", err);
      setError(
        err.response?.data?.message || err.message || "Submission failed"
      );
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          {loading.students ? (
            <LoadingMessage>Loading students...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>Error: {error}</ErrorMessage>
          ) : (
            <>
              <AttendanceHeader>
                Mark Attendance - {new Date(date).toLocaleDateString()}
              </AttendanceHeader>

              <DatePicker
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setAttendanceData({});
                }}
              />

              {students.length === 0 ? (
                <EmptyMessage>
                  No students available for attendance
                </EmptyMessage>
              ) : (
                <>
                  <AttendanceList>
                    {students.map((student, index) => (
                      <React.Fragment key={student.id || index}>
                        <AttendanceItem>
                          <StudentName>
                            {student.name} ({student.rollNo})
                          </StudentName>

                          <CheckboxLabel>
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              checked={
                                attendanceData[student.id]?.isPresent === true
                              }
                              onChange={() =>
                                handleStatusChange(student.id, true)
                              }
                            />
                            Present
                          </CheckboxLabel>

                          <CheckboxLabel>
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              checked={
                                attendanceData[student.id]?.isPresent === false
                              }
                              onChange={() =>
                                handleStatusChange(student.id, false)
                              }
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
                      loading.submission ||
                      Object.keys(attendanceData).length === 0
                    }
                  >
                    {loading.submission ? "Submitting..." : "Submit Attendance"}
                  </SubmitButton>
                </>
              )}
            </>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
