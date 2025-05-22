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
        const token = localStorage.getItem("authToken");
        const studentId = localStorage.getItem("userId");

        // Fetch fresh data from API
        const response = await axios.get(
          `http://localhost:8080/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudentData(response.data);
        localStorage.setItem("userProfile", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching student data:", error);
        // Fallback to cached data if available
        const cachedProfile = localStorage.getItem("userProfile");
        if (cachedProfile) {
          setStudentData(JSON.parse(cachedProfile));
        }
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
            Welcome, {studentData?.name || localStorage.getItem("userName")}!
          </SectionTitle>

          <CardContainer>
            <Card>
              <CardTitle>Academic Information</CardTitle>
              <CardContent>
                <p>ID: {studentData?.univId || "N/A"}</p>
                <p>Program: {studentData?.program || "N/A"}</p>
                <p>Semester: {studentData?.semester || "N/A"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Contact Information</CardTitle>
              <CardContent>
                <p>
                  Email:{" "}
                  {studentData?.email || localStorage.getItem("userEmail")}
                </p>
                <p>Phone: {studentData?.phone || "N/A"}</p>
              </CardContent>
            </Card>
          </CardContainer>
        </Section>
      </Content>
    </DashboardContainer>
  );
};

export default StudentDashboard;
