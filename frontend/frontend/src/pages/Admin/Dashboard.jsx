import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import EventCalendar from "./EventCalendar";
import Announcement from "./Announcement";
import Performance from "./Performance";

import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from "../../styles/DashboardStyles";

import axios from "axios";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  // Dummy event and announcement data
  const events = [
    { title: "Science Fair", date: "2025-04-25" },
    { title: "Exam Week", date: "2025-05-01" },
  ];

  const announcements = [
    { id: 1, text: "All students must submit their assignments by Friday." },
    { id: 2, text: "Teacher's workshop this weekend." },
  ];

  const studentPerformance = [
    { name: "Ankit", score: 92 },
    { name: "Riya", score: 88 },
    { name: "Aman", score: 76 },
  ];

  // Fetch counts from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/AdminDashboard/students/count")
      .then((response) => setStudentCount(response.data))
      .catch((error) => console.error("Error fetching student count:", error));

    axios
      .get("http://localhost:8080/api/AdminDashboard/faculty/count")
      .then((response) => setTeacherCount(response.data))
      .catch((error) => console.error("Error fetching teacher count:", error));
  }, []);

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content $isOpen={isOpen}>
        <TopContent>
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
            <EventCalendar events={events} />
          </Section>
        </TopContent>

        <BottomContent>
          <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} />
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
