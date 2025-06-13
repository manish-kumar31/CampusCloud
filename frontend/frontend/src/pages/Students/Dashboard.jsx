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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const firebaseUid = localStorage.getItem("userFirebaseId");

        if (!token || !firebaseUid) {
          throw new Error("Authentication token or Firebase UID not found.");
        }

        const response = await axios.get(
          `http://localhost:8080/api/students/${firebaseUid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudentData(response.data);

        // ✅ Refresh cached data with latest profile every time
        localStorage.setItem("userProfile", JSON.stringify(response.data));
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message || "Failed to fetch student data.");

        // ✅ Fallback to cached data only if API fails
        const cachedProfile = localStorage.getItem("userProfile");
        if (cachedProfile) {
          setStudentData(JSON.parse(cachedProfile));
          setError(null); // ✅ Clear error if fallback works
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {error}
          <br />
          Please login again if the problem persists.
        </div>
      )}

      {studentData ? (
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
                  </CardContent>
                </Card>

                <Card>
                  <CardTitle>Contact Information</CardTitle>
                  <CardContent>
                    <div>Email: {studentData?.emailId || "N/A"}</div>
                    <div>Phone: {studentData?.contactNo || "N/A"}</div>
                    <div>Address: {studentData?.address || "N/A"}</div>
                  </CardContent>
                </Card>
              </CardContainer>
            </Section>
          </Content>
        </DashboardContainer>
      ) : (
        <div style={{ color: "red" }}>
          Unable to load your profile. Please login again.
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
