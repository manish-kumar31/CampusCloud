import React, { useState } from "react";
import {
  AdminSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
} from "../styles/AdminSignInStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Sign-In form submitted!");
    alert("Sign-In process starting...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: email,
          password: password, // expected in yyyy-MM-dd format
        }
      );

      const data = response.data;

      if (data.status === "success" && data.role === "ADMIN") {
        alert("Login successful!");
        console.log("Admin logged in:", data);
        navigate(data.redirect); // should be '/admin/dashboard'
      } else {
        alert("Not an admin or login failed.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <AdminSignInContainer>
      <h1>Admin Sign In</h1>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password (yyyy-MM-dd)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Sign In</SubmitButton>
      </FormContainer>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
