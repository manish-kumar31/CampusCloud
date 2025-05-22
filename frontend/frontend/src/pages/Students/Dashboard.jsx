import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  StudentDashboardContainer,
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
    // First check if we have cached profile data
    const cachedProfile = localStorage.getItem("studentProfile");
    if (cachedProfile) {
      setStudentData(JSON.parse(cachedProfile));
      setLoading(false);
      return;
    }

    // If not, fetch from API
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        const studentId = localStorage.getItem("studentId");

        const response = await axios.get(
          `http://localhost:8080/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudentData(response.data);
        localStorage.setItem("studentProfile", JSON.stringify(response.data));
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
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>
            Welcome,{" "}
            {studentData?.name ||
              localStorage.getItem("studentName") ||
              "Student"}
            !
          </SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Email</CardTitle>
              <CardContent>
                {studentData?.email ||
                  localStorage.getItem("studentEmail") ||
                  "N/A"}
              </CardContent>
            </Card>
          </CardContainer>
        </Section>

        {/* Rest of your dashboard sections */}
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
