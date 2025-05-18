import React, { useState } from 'react';
import { AdminRegisterContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminRegisterStyles';
import axios from 'axios';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register/admin', { email, password });
      if (response.status === 200) {
        // Registration successful, redirect to admin login
        window.location.href = '/admin-signIn';
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <AdminRegisterContainer>
      <h2>Admin Register</h2>
      <FormContainer onSubmit={handleRegister}>  {/* Using onSubmit here */}
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
        <SubmitButton type="submit">Register</SubmitButton>  {/* Submit button with type="submit" */}
      </FormContainer>
    </AdminRegisterContainer>
  );
};

export default AdminRegister;
