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
          username: univId, // Changed from universityId to match backend
          password: dob, // Changed from dob to match backend
        }
      );

      if (
        response.data.status === "success" &&
        response.data.role === "FACULTY"
      ) {
        localStorage.setItem("teacherName", response.data.name);
        localStorage.setItem("teacherId", response.data.userId);

        // Only store if header exists
        if (response.headers["x-faculty-univid"]) {
          localStorage.setItem(
            "facultyUnivId",
            response.headers["x-faculty-univid"]
          );
        }

        navigate(response.data.redirect || "/teacher/dashboard");
      } else {
        setError(response.data?.message || "Invalid credentials");
      }
    } catch (error) {
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
