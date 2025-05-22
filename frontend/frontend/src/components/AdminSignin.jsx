import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, signInWithEmailAndPassword } from "../firebase";
import {
  AdminSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "../styles/AdminSignInStyles";

const AdminSignIn = () => {
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
        response.data.role.toLowerCase() === "admin"
      ) {
        localStorage.setItem("adminName", response.data.name);
        localStorage.setItem("adminId", response.data.userId);
        localStorage.setItem("firebaseToken", idToken);

        navigate(response.data.redirectUrl || "/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");

      // Handle password reset
      if (error.code === "auth/wrong-password") {
        if (confirm("Wrong password. Would you like to reset your password?")) {
          // Implement password reset logic here
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminSignInContainer>
      <h1>Admin Portal</h1>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="Admin Email"
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
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
