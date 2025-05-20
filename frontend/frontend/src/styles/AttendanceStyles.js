import styled from "styled-components";

// Layout Components
export const AttendanceContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 240px;
  transition: margin 0.3s ease;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const AttendanceContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 1000px;
  margin: 0 auto;
`;

// Header Components
export const AttendanceHeader = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Date Picker
export const DatePicker = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.25);
  }
`;

// List Components
export const AttendanceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
`;

export const AttendanceItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #dee2e6;
  }
`;

// Student Info Components
export const StudentName = styled.span`
  flex: 1;
  font-weight: 500;
  color: #343a40;
  font-size: 1.05rem;
`;

export const RollNumber = styled.span`
  color: #6c757d;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  font-weight: 400;
`;

// Attendance Control Components
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #495057;
  transition: color 0.2s ease;

  input {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${(props) => (props.present ? "#28a745" : "#dc3545")};

    &:checked {
      background-color: ${(props) => (props.present ? "#28a745" : "#dc3545")};
    }
  }

  &:hover {
    color: #212529;
  }
`;

export const AttendanceStatus = styled.span`
  margin-left: 1rem;
  color: ${({ present }) => (present ? "#28a745" : "#dc3545")};
  font-weight: ${({ present }) => (present ? "600" : "500")};
  font-size: 0.9rem;
`;

// Divider Component
export const Divider = styled.hr`
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid #e9ecef;
`;

// Button Components
export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4e73df;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3a5bd9;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// Message Components
export const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  margin: 1rem 0;
  border: 1px solid #f5c6cb;
  font-size: 0.95rem;
`;

export const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #dee2e6;
  font-size: 1rem;
`;

// Status Components
export const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${(props) => (props.present ? "#28a745" : "#dc3545")};
`;

// Summary Components
export const AttendanceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;
export const AttendanceDate = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
`;
export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f1f3f5;
  padding: 1.5rem;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
`;
export const SignInTitle = styled.h1`
  // some styles here
`;
export const SummaryItem = styled.div`
  text-align: center;
  flex: 1;
  padding: 0 0.5rem;

  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => (props.highlight ? "#4e73df" : "#495057")};
    margin-bottom: 0.25rem;
  }

  small {
    color: #6c757d;
    font-size: 0.85rem;
    display: block;
  }
`;
