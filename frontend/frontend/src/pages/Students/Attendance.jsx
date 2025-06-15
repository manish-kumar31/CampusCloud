import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  AttendanceContainer,
  SidebarContainer,
  Content,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  AttendanceDate,
  AttendanceStatus,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
  SubjectFilter,
  StatsContainer,
  StatsItem,
  StatsTitle,
  StatsValue,
  AttendanceSubject,
} from "../../styles/AttendanceStyles";

const API_BASE_URL = "http://localhost:8080/api";

const AttendanceSection = () => {
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({
    attendance: false,
    subjects: false,
    stats: false,
  });
  const [error, setError] = useState(null);

  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  // Fetch all attendance records for student
  const fetchAttendance = async () => {
    try {
      setLoading((prev) => ({ ...prev, attendance: true }));
      setError(null);

      const studentEmail = localStorage.getItem("userEmail");
      if (!studentEmail) throw new Error("Student email not found");

      const response = await axios.get(
        `${API_BASE_URL}/attendance/student/${studentEmail}`,
        authConfig
      );

      setAttendance(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading((prev) => ({ ...prev, attendance: false }));
    }
  };

  // Fetch subjects student is enrolled in
  const fetchSubjects = async () => {
    try {
      setLoading((prev) => ({ ...prev, subjects: true }));

      const studentEmail = localStorage.getItem("userEmail");
      if (!studentEmail) throw new Error("Student email not found");

      const response = await axios.get(
        `${API_BASE_URL}/students/${studentEmail}/subjects`,
        authConfig
      );

      setSubjects(response.data);
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
    } finally {
      setLoading((prev) => ({ ...prev, subjects: false }));
    }
  };

  // Fetch attendance statistics
  const fetchStats = async () => {
    try {
      setLoading((prev) => ({ ...prev, stats: true }));

      const studentEmail = localStorage.getItem("userEmail");
      if (!studentEmail) throw new Error("Student email not found");

      const response = await axios.get(
        `${API_BASE_URL}/students/${studentEmail}/attendance-summary`,
        authConfig
      );

      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchSubjects();
    fetchStats();
  }, []);

  const filteredAttendance =
    selectedSubject === "all"
      ? attendance
      : attendance.filter((record) => record.subject?.id === selectedSubject);

  return (
    <AttendanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <AttendanceHeader>My Attendance Records</AttendanceHeader>

        {stats && (
          <StatsContainer>
            <StatsItem>
              <StatsTitle>Overall Attendance</StatsTitle>
              <StatsValue>{stats.overallPercentage}%</StatsValue>
            </StatsItem>
            <StatsItem>
              <StatsTitle>From Date</StatsTitle>
              <StatsValue>
                {new Date(stats.startDate).toLocaleDateString()}
              </StatsValue>
            </StatsItem>
            <StatsItem>
              <StatsTitle>To Date</StatsTitle>
              <StatsValue>
                {new Date(stats.endDate).toLocaleDateString()}
              </StatsValue>
            </StatsItem>
          </StatsContainer>
        )}

        {loading.subjects ? (
          <LoadingMessage>Loading subjects...</LoadingMessage>
        ) : subjects.length > 0 ? (
          <SubjectFilter
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subjectName} ({subject.subjectCode})
              </option>
            ))}
          </SubjectFilter>
        ) : null}

        {loading.attendance ? (
          <LoadingMessage>Loading attendance records...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : filteredAttendance.length === 0 ? (
          <EmptyMessage>No attendance records found</EmptyMessage>
        ) : (
          <AttendanceList>
            {filteredAttendance.map((record) => (
              <AttendanceItem key={record.id}>
                <AttendanceDate>
                  {new Date(record.date).toLocaleDateString()}
                </AttendanceDate>
                <AttendanceSubject>
                  {record.subject?.subjectName || "Unknown Subject"}(
                  {record.subject?.subjectCode || "N/A"})
                </AttendanceSubject>
                <AttendanceStatus
                  className={record.present ? "present" : "absent"}
                >
                  {record.present ? "Present" : "Absent"}
                </AttendanceStatus>
                {record.remarks && (
                  <div style={{ fontStyle: "italic", color: "#666" }}>
                    Remarks: {record.remarks}
                  </div>
                )}
              </AttendanceItem>
            ))}
          </AttendanceList>
        )}
      </Content>
    </AttendanceContainer>
  );
};

export default AttendanceSection;
