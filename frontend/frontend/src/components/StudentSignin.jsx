import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ for API call
import {
  StudentSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
} from "../styles/StudentSignInStyles";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: email,
          password: password,
        }
      );

      if (
        response.data.status === "success" &&
        response.data.role === "STUDENT"
      ) {
        console.log("Login success:", response.data);
        // Optional: Store in localStorage or context
        localStorage.setItem("studentName", response.data.name);
        localStorage.setItem("studentId", response.data.userId);

        navigate("/student/dashboard");
      } else {
        setError("Invalid role or credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <StudentSignInContainer>
      <h2>Student Sign In</h2>
      <FormContainer>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
