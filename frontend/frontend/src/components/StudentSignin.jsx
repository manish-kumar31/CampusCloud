import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import {
  StudentSignInContainer,
  FormContainer,
  InputField,
  SubmitButton
} from '../styles/StudentSignInStyles';

const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleSignIn = () => {
    console.log('Student Sign In:', { email, password });
    // Navigate to dashboard
    navigate('/student/dashboard');
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
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
