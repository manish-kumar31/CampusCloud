import styled from "styled-components";

// Layout
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
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 1000px;
  margin: 0 auto;
`;

// Header
export const AttendanceHeader = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
`;

// Date Picker
export const DatePicker = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 250px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.25);
  }
`;

// Student List
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

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const StudentName = styled.span`
  flex: 1;
  font-weight: 500;
  color: #343a40;
  font-size: 1.05rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #495057;
  transition: color 0.2s ease;
  white-space: nowrap;

  input[type="radio"] {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #4e73df;
  }

  &:hover {
    color: #212529;
  }
`;

export const Divider = styled.hr`
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid #e9ecef;
`;

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
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 250px;

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
`;

// Message Components
export const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ErrorMessage = styled.div`
  padding: 1.5rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid #f5c6cb;
  font-size: 1rem;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  background-color: #fff;
  border-radius: 8px;
  border: 1px dashed #dee2e6;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
export const AttendanceDate = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
`;
export const AttendanceStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;

  &.present {
    background-color: #d4edda;
    color: #155724;
  }

  &.absent {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

export const SidebarContainer = styled.div`
  width: 240px;
  min-height: 100vh;
  background-color: #343a40;
  color: white;
  position: fixed;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: auto;
    position: relative;
  }
`;
