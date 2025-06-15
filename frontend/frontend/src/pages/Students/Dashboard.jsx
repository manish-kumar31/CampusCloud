import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  DashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from "../../styles/DashboardStyles";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/student/dashboard"
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>
            Welcome, {studentData?.name || "Student"}!
          </SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Academic Information</CardTitle>
              <CardContent>
                <div>University ID: {studentData?.univId || "N/A"}</div>
                <div>Program: {studentData?.course || "N/A"}</div>
                <div>Semester: {studentData?.semester || "N/A"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Contact Information</CardTitle>
              <CardContent>
                <div>Email: {studentData?.email || "N/A"}</div>
                <div>Phone: {studentData?.contactNo || "N/A"}</div>
                <div>Address: {studentData?.address || "N/A"}</div>
              </CardContent>
            </Card>
          </CardContainer>
        </Section>
      </Content>
    </DashboardContainer>
  );
};

export default StudentDashboard;
