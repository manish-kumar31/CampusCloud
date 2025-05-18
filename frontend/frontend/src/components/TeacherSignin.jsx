// TeacherSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import {
  TeacherSignInContainer,
  FormContainer,
  InputField,
  SubmitButton
} from '../styles/TeacherSignInStyles';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Create navigate instance

  const handleSignIn = () => {
    console.log('Teacher Sign In:', { email, password });

    // Navigate to teacher dashboard
    navigate('/teacher/dashboard'); // ✅ navigation logic
  };

  return (
    <TeacherSignInContainer>
      <h2>Teacher Sign In</h2>
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
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
