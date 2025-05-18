import styled from 'styled-components';

// Main Dashboard Structure
export const AdminDashboardContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
`;

// Layout Components
export const TopContent = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
`;

export const BottomContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

export const Section = styled.section`
  margin-bottom: 40px;
  flex: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

// Cards
export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  flex: 1;
  max-width: 250px;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #007bff; 
`;

export const CardContent = styled.p`
  font-size: 16px;
  color: #555555;
`;

// Events & Calendar Components
export const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const EventInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const EventButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const CurrentTimeDisplay = styled.div`
  padding: 10px 15px;
  background-color: #e2e3e5;
  border-radius: 4px;
  font-size: 14px;
  color: #383d41;
  margin-bottom: 15px;
  display: inline-block;
`;

// Dashboard Specific Containers
export const StudentDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
`;

export const TeacherDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
`;

// Calendar Container (if needed)
export const CalendarContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;