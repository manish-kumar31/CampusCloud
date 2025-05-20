import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  BsGraphUp,
  BsPeople,
  BsPerson,
  BsFileText,
  BsBook,
  BsGraphDown,
  BsCalendar,
  BsGear,
  BsChatDots,
  BsCalendarEvent,
} from "react-icons/bs";

const SidebarContainer = styled.div`
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "60px")};
  min-height: 100vh;
  background-color: #343a40;
  color: white;
  position: fixed;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${({ $isOpen }) => ($isOpen ? "100%" : "60px")};
    height: auto;
    position: relative;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  border-bottom: 1px solid #495057;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #495057;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SidebarIcon = styled.div`
  min-width: 24px;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: ${({ $isOpen }) => ($isOpen ? "50px" : "30px")};
  height: auto;
  transition: all 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <Logo $isOpen={isOpen} src={"../assets/bg1.png"} alt="Logo" />
        {isOpen && "Teacher"}
      </SidebarHeader>

      <SidebarNav>
        {[
          {
            icon: <BsGraphUp />,
            text: "Dashboard",
            path: "/teacher/dashboard",
          },
          { icon: <BsPeople />, text: "Classes", path: "/teacher/classes" },
          { icon: <BsPeople />, text: "Students", path: "/teacher/students" },
          { icon: <BsPerson />, text: "Teachers", path: "/teacher/teachers" },
          {
            icon: <BsFileText />,
            text: "Assignments",
            path: "/teacher/assignments",
          },
          { icon: <BsBook />, text: "Exams", path: "/teacher/exams" },
          {
            icon: <BsGraphDown />,
            text: "Performance",
            path: "/teacher/performance",
          },
          {
            icon: <BsCalendar />,
            text: "Attendance",
            path: "/teacher/attendance",
          },
          {
            icon: <BsChatDots />,
            text: "Announcement",
            path: "/teacher/communication",
          },
          {
            icon: <BsCalendarEvent />,
            text: "Events & Calendar",
            path: "/teacher/events",
          },
          {
            icon: <BsGear />,
            text: "Settings & Profile",
            path: "/teacher/settings",
          },
        ].map((item, index) => (
          <SidebarNavItem key={index}>
            <SidebarIcon>{item.icon}</SidebarIcon>
            {isOpen && <StyledLink to={item.path}>{item.text}</StyledLink>}
          </SidebarNavItem>
        ))}
      </SidebarNav>

      <ToggleButton onClick={toggleSidebar}>{isOpen ? "◀" : "▶"}</ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
