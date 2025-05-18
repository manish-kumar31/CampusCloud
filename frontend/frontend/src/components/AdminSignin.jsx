import React, { useState } from 'react';
import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between Sign In and Register modes
  const navigate = useNavigate();

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign-In form submitted!'); // Check if the form submission is triggering
    alert('Sign-In process starting...');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in user:', userCredential.user);
      alert('Login successful!');
      navigate('/admin/dashboard'); // Redirect after successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid credentials or error signing in.');
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register form submitted!'); // Check if the register submission is triggering
    alert('Register process starting...');
    
    // Check if email or password is empty
    if (!email || !password) {
      alert("Email and Password are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered user:', userCredential.user);
      alert('Registration successful! You can now sign in.');
      setIsRegistering(false); // Switch to Sign In mode after successful registration
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Error registering user.');
    }
  };

  return (
    <AdminSignInContainer>
      <h1>{isRegistering ? 'Admin Register' : 'Admin Sign In'}</h1>
      <FormContainer onSubmit={isRegistering ? handleRegister : handleSignIn}>
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
        <SubmitButton type="submit">{isRegistering ? 'Register' : 'Sign In'}</SubmitButton>
      </FormContainer>

      {/* Toggle between Sign In and Register */}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
      </button>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
