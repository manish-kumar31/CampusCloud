import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  LoadingMessage,
  EmptyMessage,
  DatePicker,
  SubjectSelector,
  StatsContainer,
  StatsItem,
  StatsTitle,
  StatsValue,
  RemarksInput,
} from "../../styles/AttendanceStyles";

const API_BASE_URL = "http://localhost:8080/api";

const CheckAttendanceSection = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({
    subjects: false,
    students: false,
    stats: false,
    submission: false,
  });

  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  // Fetch subjects taught by the faculty
  const fetchSubjects = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, subjects: true }));
      const response = await axios.get(
        `${API_BASE_URL}/enrollments/faculty`,
        authConfig
      );
      setSubjects(response.data);
      if (response.data.length > 0) {
        setSelectedSubject(response.data[0].id);
      }
    } catch (err) {
      toast.error(
        "Failed to fetch subjects: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading((prev) => ({ ...prev, subjects: false }));
    }
  }, []);

  // Fetch students enrolled in selected subject
  const fetchStudents = useCallback(async () => {
    if (!selectedSubject) return;
    try {
      setLoading((prev) => ({ ...prev, students: true }));
      setStudents([]);
      setAttendanceData({});

      const response = await axios.get(
        `${API_BASE_URL}/enrollments/${selectedSubject}`,
        authConfig
      );

      // Check if students are returned properly
      console.log("Subject enrollment response:", response.data);

      if (
        response.data.enrolledStudents &&
        response.data.enrolledStudents.length > 0
      ) {
        setStudents(response.data.enrolledStudents);
      } else {
        toast.info("No students enrolled in this subject");
        setStudents([]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      toast.error(
        "Failed to fetch students: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  }, [selectedSubject]);

  // Load existing attendance for selected date
  const loadExistingAttendance = useCallback(async () => {
    if (!selectedSubject || students.length === 0) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/attendance/subject/${selectedSubject}/date/${date}`,
        authConfig
      );

      const newAttendanceData = {};
      response.data.forEach((record) => {
        // Use student email as key
        newAttendanceData[record.student.email] = {
          present: record.present,
          remarks: record.remarks || "",
        };
      });

      // Initialize all students
      students.forEach((student) => {
        if (!newAttendanceData[student.email]) {
          newAttendanceData[student.email] = {
            present: null,
            remarks: "",
          };
        }
      });

      setAttendanceData(newAttendanceData);
    } catch (err) {
      if (err.response?.status === 404) {
        // No attendance exists for this date - initialize empty
        const emptyData = {};
        students.forEach((student) => {
          emptyData[student.email] = {
            present: null,
            remarks: "",
          };
        });
        setAttendanceData(emptyData);
      } else {
        toast.error(
          "Failed to load attendance: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  }, [selectedSubject, students, date]);

  // Fetch attendance statistics
  const fetchStats = useCallback(async () => {
    if (!selectedSubject) return;
    try {
      setLoading((prev) => ({ ...prev, stats: true }));
      const response = await axios.get(
        `${API_BASE_URL}/attendance/stats/subject/${selectedSubject}`,
        authConfig
      );
      setStats(response.data);
    } catch (err) {
      toast.error(
        "Failed to fetch stats: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  }, [selectedSubject]);

  // Handle attendance submission
  const handleSubmit = async () => {
    try {
      setLoading((prev) => ({ ...prev, submission: true }));

      const facultyEmail = localStorage.getItem("userEmail");
      if (!facultyEmail) throw new Error("Faculty email not found");

      // Prepare bulk attendance request
      const studentAttendances = students.map((student) => ({
        studentEmail: student.email,
        present: attendanceData[student.email]?.present || false,
        remarks: attendanceData[student.email]?.remarks || "",
      }));

      const request = {
        facultyEmail,
        subjectId: selectedSubject,
        date,
        studentAttendances,
      };

      await axios.post(`${API_BASE_URL}/attendance/bulk`, request, authConfig);

      toast.success("Attendance submitted successfully!");
      fetchStats();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(
        "Submission failed: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // When subject changes, fetch students and stats
  useEffect(() => {
    if (selectedSubject) {
      fetchStudents();
      fetchStats();
    }
  }, [selectedSubject, fetchStudents, fetchStats]);

  // When students or date changes, load attendance
  useEffect(() => {
    if (students.length > 0) {
      loadExistingAttendance();
    }
  }, [students, date, loadExistingAttendance]);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Mark Attendance - {new Date(date).toLocaleDateString()}
          </AttendanceHeader>

          <ToastContainer position="top-center" autoClose={3000} />

          {loading.subjects ? (
            <LoadingMessage>Loading subjects...</LoadingMessage>
          ) : subjects.length > 0 ? (
            <>
              <SubjectSelector
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={loading.subjects || loading.students}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectName} ({subject.subjectCode})
                  </option>
                ))}
              </SubjectSelector>

              <DatePicker
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />

              {stats && (
                <StatsContainer>
                  <StatsItem>
                    <StatsTitle>Total Classes</StatsTitle>
                    <StatsValue>{stats.totalClasses}</StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsTitle>Average Attendance</StatsTitle>
                    <StatsValue>{stats.attendancePercentage}%</StatsValue>
                  </StatsItem>
                </StatsContainer>
              )}

              {loading.students ? (
                <LoadingMessage>Loading students...</LoadingMessage>
              ) : students.length === 0 ? (
                <EmptyMessage>
                  No students enrolled in this subject
                </EmptyMessage>
              ) : (
                <>
                  <AttendanceList>
                    {students.map((student) => (
                      <React.Fragment key={student.email}>
                        <AttendanceItem>
                          <StudentName>
                            {student.name} ({student.rollNo || student.univId})
                          </StudentName>

                          <div>
                            <CheckboxLabel>
                              <input
                                type="radio"
                                name={`attendance-${student.email}`}
                                checked={
                                  attendanceData[student.email]?.present ===
                                  true
                                }
                                onChange={() => {
                                  setAttendanceData((prev) => ({
                                    ...prev,
                                    [student.email]: {
                                      ...prev[student.email],
                                      present: true,
                                    },
                                  }));
                                }}
                              />
                              Present
                            </CheckboxLabel>

                            <CheckboxLabel>
                              <input
                                type="radio"
                                name={`attendance-${student.email}`}
                                checked={
                                  attendanceData[student.email]?.present ===
                                  false
                                }
                                onChange={() => {
                                  setAttendanceData((prev) => ({
                                    ...prev,
                                    [student.email]: {
                                      ...prev[student.email],
                                      present: false,
                                    },
                                  }));
                                }}
                              />
                              Absent
                            </CheckboxLabel>
                          </div>

                          <RemarksInput
                            type="text"
                            placeholder="Remarks"
                            value={attendanceData[student.email]?.remarks || ""}
                            onChange={(e) => {
                              setAttendanceData((prev) => ({
                                ...prev,
                                [student.email]: {
                                  ...prev[student.email],
                                  remarks: e.target.value,
                                },
                              }));
                            }}
                          />
                        </AttendanceItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </AttendanceList>

                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={loading.submission || students.length === 0}
                  >
                    {loading.submission ? "Submitting..." : "Submit Attendance"}
                  </SubmitButton>
                </>
              )}
            </>
          ) : (
            <EmptyMessage>No subjects assigned to you</EmptyMessage>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
