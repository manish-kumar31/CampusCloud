// AdminSignInStyles.js
import styled from "styled-components";

export const AdminSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    45deg,
    rgb(159, 6, 83),
    rgb(166, 55, 11),
    #90ee90
  );
  min-height: 100vh;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffcf33;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;
export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: rgb(132, 12, 12);
  color: white;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: black;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const RegisterLink = styled.p`
  margin-top: 10px;
  font-size: 14px;

  a {
    color: blue;
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
  }
`;
