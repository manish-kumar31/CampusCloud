import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from "../../styles/SettingsProfileStyles";
import axios from "axios";

const ProfileSection = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        const univId = localStorage.getItem("studentUnivId"); // Changed from studentId

        const response = await axios.get(
          `http://localhost:8080/api/students/${univId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudentProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfo>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{studentProfile?.name || "N/A"}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Roll No:</Label>
            <Value>{studentProfile?.rollNo || "N/A"}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email Id:</Label>
            <Value>{studentProfile?.email || "N/A"}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Contact No:</Label>
            <Value>{studentProfile?.contactNo || "N/A"}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Parent Name:</Label>
            <Value>{studentProfile?.parentName || "N/A"}</Value>
          </ProfileDetail>
        </ProfileInfo>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
