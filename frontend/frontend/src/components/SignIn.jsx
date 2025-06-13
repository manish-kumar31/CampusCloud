import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../firebase";
import {
  AuthContainer,
  FormContainer,
  InputField,
  SubmitButton,
  ErrorMessage,
  ResetLink,
  Title,
} from "../styles/AuthStyles";

const SignIn = () => {
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        localStorage.setItem("authToken", idToken);
        localStorage.setItem("userFirebaseId", response.data.firebaseUid);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userUnivId", response.data.univId);
        // ✅ Clear old cached profile before navigating to dashboard
        localStorage.removeItem("userProfile");

        navigate(
          response.data.redirectUrl || `/${response.data.role}/dashboard`
        );
        window.location.reload(); // ✅ Ensures StudentDashboard loads freshly
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error) => {
    let errorMessage = error.message || "Login failed. Please try again.";

    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      errorMessage =
        "Invalid email or password. Would you like to reset your password?";
      if (window.confirm(errorMessage)) {
        handlePasswordReset();
      }
      return;
    } else if (error.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    }

    setError(errorMessage);
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (resetError) {
      setError("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <AuthContainer>
      <Title>Campus Cloud University</Title>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="University Email"
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
        <ResetLink onClick={handlePasswordReset}>Forgot Password?</ResetLink>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </AuthContainer>
  );
};

export default SignIn;
