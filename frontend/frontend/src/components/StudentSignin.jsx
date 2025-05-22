import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, signInWithEmailAndPassword } from "../firebase";
import {
  StudentSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "../styles/StudentSignInStyles";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      // 2. Verify with your backend
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        response.data.status === "success" &&
        response.data.role.toLowerCase() === "student"
      ) {
        // Store all relevant student data
        localStorage.setItem("studentToken", idToken);
        localStorage.setItem("studentId", response.data.userId);
        localStorage.setItem("studentName", response.data.name);
        localStorage.setItem("studentEmail", email);

        // Store the complete profile if available
        if (response.data.profile) {
          localStorage.setItem(
            "studentProfile",
            JSON.stringify(response.data.profile)
          );
        }

        navigate(response.data.redirectUrl || "/student/dashboard");
      } else {
        setError("Invalid student credentials");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentSignInContainer>
      <h1>Student Portal</h1>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="Student Email"
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
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
