import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  TeacherDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from "../../styles/DashboardStyles";

const TeacherDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0); // Optional: add endpoint for this later

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/AdminDashboard/students/count")
      .then((response) => setStudentCount(response.data))
      .catch((error) => console.error("Error fetching student count:", error));

    axios
      .get("http://localhost:8080/api/AdminDashboard/faculty/count")
      .then((response) => setTeacherCount(response.data))
      .catch((error) => console.error("Error fetching teacher count:", error));

    // Example for class count (optional)
    axios
      .get("http://localhost:8080/api/AdminDashboard/classes/count")
      .then((response) => setClassCount(response.data))
      .catch((error) => console.error("Error fetching class count:", error));
  }, []);

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Total Students</CardTitle>
              <CardContent>{studentCount}</CardContent>
            </Card>
            <Card>
              <CardTitle>Total Teachers</CardTitle>
              <CardContent>{teacherCount}</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          {/* TODO: Add a list of recent activities */}
        </Section>

        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          {/* TODO: Add a calendar or list of events */}
        </Section>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
