import React from "react";
import {
  Navbar,
  Logo,
  NavigationLinks,
  NavLink,
  ButtonsContainer,
  LoginButton,
  GuestButton,
  HomeContainer,
  SchoolInfo,
  SchoolImage,
  Title,
  LoremTextContainer,
  AdminRegisterLink,
} from "../styles/styles";
import bg from "../assets/bg.jpeg";
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from "react-router-dom";
import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate("/choose-user");
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          <GuestButton onClick={handleLoginClick}>Guest Mode</GuestButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>Campus Management System</Title>
          <LoremTextContainer>
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              Welcome to Cloud Based Campus Management System
            </h2>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">
            Click Here To Register
          </AdminRegisterLink>
        </SchoolInfo>
        <SchoolImage
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1, // Ensures content appears above it
            opacity: 1, // Adjust transparency as needed
          }}
        />
      </HomeContainer>
    </>
  );
};

export default Home;
