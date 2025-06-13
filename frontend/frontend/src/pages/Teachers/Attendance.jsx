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
  const [state, setState] = useState({
    students: [],
    subjects: [],
    selectedSubject: null,
    attendanceData: {},
    date: new Date().toISOString().split("T")[0],
    stats: null,
  });

  const [loading, setLoading] = useState({
    subjects: false,
    students: false,
    submission: false,
    stats: false,
  });

  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, subjects: true }));

      // Debug: Check what's actually in localStorage
      console.log(
        "Current faculty ID in localStorage:",
        localStorage.getItem("userUnivId")
      );

      const response = await axios.get(
        `${API_BASE_URL}/enrollments/faculty`,
        authConfig
      );

      // Debug: Check what the backend returned
      console.log("Subjects from API:", response.data);

      setState((prev) => ({
        ...prev,
        subjects: response.data,
        selectedSubject: response.data.length > 0 ? response.data[0].id : null,
      }));
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading((prev) => ({ ...prev, subjects: false }));
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      if (!state.selectedSubject) return;
      setLoading((prev) => ({ ...prev, students: true }));

      const response = await axios.get(
        `${API_BASE_URL}/subjects/${state.selectedSubject}/students`,
        authConfig
      );

      setState((prev) => ({ ...prev, students: response.data }));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  }, [state.selectedSubject]);

  const loadExistingAttendance = useCallback(async () => {
    try {
      if (!state.selectedSubject || state.students.length === 0) return;

      const response = await axios.get(
        `${API_BASE_URL}/attendance/subject/${state.selectedSubject}/date/${state.date}`,
        authConfig
      );

      const existingData = {};
      response.data.forEach((record) => {
        existingData[record.student.univId] = {
          studentId: record.student.univId,
          subjectId: state.selectedSubject,
          date: state.date,
          isPresent: record.present,
          remarks: record.remarks || "",
        };
      });

      // Initialize attendance data for all students
      const initializedData = { ...existingData };
      state.students.forEach((student) => {
        if (!initializedData[student.univId]) {
          initializedData[student.univId] = {
            studentId: student.univId,
            subjectId: state.selectedSubject,
            date: state.date,
            isPresent: null,
            remarks: "",
          };
        }
      });

      setState((prev) => ({ ...prev, attendanceData: initializedData }));
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error(
          err.response?.data?.message || "Failed to load attendance data"
        );
      }
    }
  }, [state.selectedSubject, state.students, state.date]);

  const fetchAttendanceStats = useCallback(async () => {
    try {
      if (!state.selectedSubject) return;
      setLoading((prev) => ({ ...prev, stats: true }));

      const response = await axios.get(
        `${API_BASE_URL}/attendance/stats/subject/${state.selectedSubject}`,
        authConfig
      );

      setState((prev) => ({ ...prev, stats: response.data }));
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  }, [state.selectedSubject]);

  const handleStatusChange = (studentId, isPresent) => {
    setState((prev) => ({
      ...prev,
      attendanceData: {
        ...prev.attendanceData,
        [studentId]: {
          ...prev.attendanceData[studentId],
          studentId,
          subjectId: prev.selectedSubject,
          date: prev.date,
          isPresent,
          remarks: prev.attendanceData[studentId]?.remarks || "",
        },
      },
    }));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setState((prev) => ({
      ...prev,
      attendanceData: {
        ...prev.attendanceData,
        [studentId]: {
          ...prev.attendanceData[studentId],
          remarks,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const facultyUnivId = localStorage.getItem("userUnivId");
      if (!facultyUnivId) throw new Error("Faculty ID not found");

      const allMarked = state.students.every(
        (student) => state.attendanceData[student.univId]?.isPresent !== null
      );

      if (!allMarked) {
        return toast.warn("Please mark attendance for all students.");
      }

      setLoading((prev) => ({ ...prev, submission: true }));

      await axios.post(
        `${API_BASE_URL}/attendance/bulk`,
        {
          facultyUnivId,
          subjectId: state.selectedSubject,
          date: state.date,
          studentAttendances: Object.values(state.attendanceData).map(
            (record) => ({
              studentUnivId: record.studentId,
              present: record.isPresent,
              remarks: record.remarks,
            })
          ),
        },
        {
          ...authConfig,
          headers: {
            ...authConfig.headers,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Attendance submitted successfully!");
      fetchAttendanceStats();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Fetch students and attendance when subject or date changes
  useEffect(() => {
    if (state.selectedSubject) {
      const fetchData = async () => {
        await fetchStudents();
        await loadExistingAttendance();
        await fetchAttendanceStats();
      };
      fetchData();
    }
  }, [
    state.selectedSubject,
    state.date,
    fetchStudents,
    loadExistingAttendance,
    fetchAttendanceStats,
  ]);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Mark Attendance - {new Date(state.date).toLocaleDateString()}
          </AttendanceHeader>

          <ToastContainer position="top-center" autoClose={3000} />

          {loading.subjects ? (
            <LoadingMessage>Loading subjects...</LoadingMessage>
          ) : state.subjects.length > 0 ? (
            <>
              <SubjectSelector
                value={state.selectedSubject || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    selectedSubject: e.target.value,
                  }))
                }
                disabled={loading.subjects || loading.students}
              >
                {state.subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectName} ({subject.subjectCode})
                  </option>
                ))}
              </SubjectSelector>

              <DatePicker
                type="date"
                value={state.date}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, date: e.target.value }))
                }
                max={new Date().toISOString().split("T")[0]}
                disabled={loading.students}
              />

              {state.stats && (
                <StatsContainer>
                  <StatsItem>
                    <StatsTitle>Total Classes</StatsTitle>
                    <StatsValue>{state.stats.totalClasses}</StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsTitle>Average Attendance</StatsTitle>
                    <StatsValue>{state.stats.attendancePercentage}%</StatsValue>
                  </StatsItem>
                </StatsContainer>
              )}

              {loading.students ? (
                <LoadingMessage>Loading students...</LoadingMessage>
              ) : state.students.length === 0 ? (
                <EmptyMessage>
                  No students enrolled in this subject
                </EmptyMessage>
              ) : (
                <>
                  <AttendanceList>
                    {state.students.map((student) => (
                      <React.Fragment key={student.univId}>
                        <AttendanceItem>
                          <StudentName>
                            {student.name} ({student.rollNo || student.univId})
                          </StudentName>

                          <div>
                            <CheckboxLabel>
                              <input
                                type="radio"
                                name={`attendance-${student.univId}`}
                                checked={
                                  state.attendanceData[student.univId]
                                    ?.isPresent === true
                                }
                                onChange={() =>
                                  handleStatusChange(student.univId, true)
                                }
                              />
                              Present
                            </CheckboxLabel>

                            <CheckboxLabel>
                              <input
                                type="radio"
                                name={`attendance-${student.univId}`}
                                checked={
                                  state.attendanceData[student.univId]
                                    ?.isPresent === false
                                }
                                onChange={() =>
                                  handleStatusChange(student.univId, false)
                                }
                              />
                              Absent
                            </CheckboxLabel>
                          </div>

                          <RemarksInput
                            type="text"
                            placeholder="Remarks"
                            value={
                              state.attendanceData[student.univId]?.remarks ||
                              ""
                            }
                            onChange={(e) =>
                              handleRemarksChange(
                                student.univId,
                                e.target.value
                              )
                            }
                          />
                        </AttendanceItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </AttendanceList>

                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={loading.submission || state.students.length === 0}
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
