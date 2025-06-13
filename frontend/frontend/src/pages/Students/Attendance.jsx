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

const AttendanceSection = () => {
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState({
    attendance: true,
    subjects: true,
    stats: true,
  });
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchAttendance = async () => {
    try {
      setLoading((prev) => ({ ...prev, attendance: true }));
      setError(null);

      const studentUnivId = localStorage.getItem("userUnivId");
      if (!studentUnivId) throw new Error("Student ID not found");

      const response = await axios.get(
        `http://localhost:8080/api/attendance/student/${studentUnivId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setAttendance(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading((prev) => ({ ...prev, attendance: false }));
    }
  };

  const fetchSubjects = async () => {
    try {
      setLoading((prev) => ({ ...prev, subjects: true }));

      const studentUnivId = localStorage.getItem("userUnivId");
      if (!studentUnivId) throw new Error("Student ID not found");

      const response = await axios.get(
        `http://localhost:8080/api/subjects/student/${studentUnivId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSubjects(response.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading((prev) => ({ ...prev, subjects: false }));
    }
  };

  const fetchAttendanceStats = async () => {
    try {
      setLoading((prev) => ({ ...prev, stats: true }));

      const studentUnivId = localStorage.getItem("userUnivId");
      if (!studentUnivId) throw new Error("Student ID not found");

      const response = await axios.get(
        `http://localhost:8080/api/attendance/stats/student/${studentUnivId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setStats(response.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchSubjects();
    fetchAttendanceStats();
  }, []);

  const filteredAttendance =
    selectedSubject === "all"
      ? attendance
      : attendance.filter((record) => record.subject.id === selectedSubject);

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
              <StatsValue>{stats.attendancePercentage}%</StatsValue>
            </StatsItem>
            <StatsItem>
              <StatsTitle>Present</StatsTitle>
              <StatsValue>{stats.totalPresent}</StatsValue>
            </StatsItem>
            <StatsItem>
              <StatsTitle>Total Classes</StatsTitle>
              <StatsValue>{stats.totalClasses}</StatsValue>
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
                {subject.subjectName}
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
                  {record.subject.subjectName} ({record.subject.subjectCode})
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
