import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AdminSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "../styles/AdminSignInStyles";

const TeacherSignIn = () => {
  const [univId, setUnivId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          universityId: univId,
          dob: dob,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response);

      if (
        response.data.status === "success" &&
        response.data.role === "FACULTY"
      ) {
        localStorage.setItem("teacherName", response.data.name);
        localStorage.setItem("teacherId", response.data.userId);
        localStorage.setItem(
          "facultyUnivId",
          response.headers["x-faculty-univid"]
        );

        console.log("Redirect path:", response.data.redirect);
        console.log(
          "Stored facultyUnivId:",
          response.headers["x-faculty-univid"]
        );

        navigate("/teacher/dashboard");
      } else {
        setError(response.data?.message || "Invalid role or credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminSignInContainer>
      <h2>Teacher Sign In</h2>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="text"
          placeholder="University ID"
          value={univId}
          onChange={(e) => setUnivId(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          pattern="\d{4}-\d{2}-\d{2}"
          title="Please enter date in YYYY-MM-DD format"
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </AdminSignInContainer>
  );
};

export default TeacherSignIn;
