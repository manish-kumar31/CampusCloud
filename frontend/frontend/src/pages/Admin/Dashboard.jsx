// AdminDashboard.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalendar'; // make sure the file is named correctly
import Announcement from './Announcement';
import Performance from './Performance';

import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from '../../styles/DashboardStyles';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  // ✅ Dummy data instead of API calls
  const events = [
    { title: 'Science Fair', date: '2025-04-25' },
    { title: 'Exam Week', date: '2025-05-01' },
  ];

  const announcements = [
    { id: 1, text: 'All students must submit their assignments by Friday.' },
    { id: 2, text: 'Teacher’s workshop this weekend.' },
  ];

  const studentPerformance = [
    { name: 'Ankit', score: 92 },
    { name: 'Riya', score: 88 },
    { name: 'Aman', score: 76 },
  ];

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content isOpen={isOpen}>
        <TopContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total Students</CardTitle>
                <CardContent>500</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>50</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Classes</CardTitle>
                <CardContent>30</CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <EventCalendar events={events} />
          </Section>
        </TopContent>

        <BottomContent>
          <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} />
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
