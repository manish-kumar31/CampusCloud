// TeacherSignInStyles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const TeacherSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    45deg,
    #ff69b4,
    #ffa07a,
    #90ee90
  ); /* Gradient background */
  min-height: 100vh; /* Full height of the viewport */
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 300px; /* Limit form width */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-weight: bold;
`;
export const SignInTitle = styled.h1`
  // some styles here
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #ff4500;
  color: white;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6347;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
