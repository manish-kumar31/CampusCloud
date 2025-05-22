import React from "react";
import {
  Navbar,
  Logo,
  ButtonsContainer,
  LoginButton,
  GuestButton,
  HomeContainer,
  SchoolInfo,
  SchoolImage,
  Title,
  LoremTextContainer,
} from "../styles/styles";
import bg from "../assets/bg.jpeg"; // Double-check this path
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/choose-user");
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Navbar
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
        }}
      >
        <Logo
          src={bg1}
          alt="Logo"
          style={{ height: "50px", transition: "transform 0.3s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <ButtonsContainer style={{ display: "flex", gap: "15px" }}>
          <LoginButton
            onClick={handleLoginClick}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e40af")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            Sign In
          </LoginButton>
          <GuestButton
            onClick={handleLoginClick}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#1f2937",
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#d1d5db")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#e5e7eb")
            }
          >
            Guest Mode
          </GuestButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <SchoolImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bg})`, // Ensure bg.jpeg exists in ../assets/
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1, // Full visibility for debugging
            zIndex: -1,
            backgroundColor: "#cccccc", // Fallback color if image fails
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Lighter overlay for debugging
            zIndex: 0,
          }}
        />
        <SchoolInfo
          style={{
            position: "relative",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          <Title
            style={{
              fontSize: "48px",
              fontWeight: "800",
              color: "#1f2937",
              marginBottom: "20px",
            }}
          >
            Campus Management System
          </Title>
          <LoremTextContainer style={{ color: "#4b5563" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "15px",
              }}
            ></h2>
            {/* Add your custom text here */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Link
                to="/choose-user"
                style={{
                  display: "inline-block",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  padding: "12px 30px",
                  borderRadius: "25px",
                  textDecoration: "none",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1e40af")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2563eb")
                }
              >
                Get Started
              </Link>
            </div>
          </LoremTextContainer>
        </SchoolInfo>
      </HomeContainer>
    </div>
  );
};

export default Home;
