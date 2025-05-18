import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalendar';
import Announcement from './Announcement';
import Performance from './Performance';
import axios from 'axios';
import { format } from 'date-fns';

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
  EventForm,
  EventInput,
  EventButton,
  CurrentTimeDisplay
} from '../../styles/DashboardStyles';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [counts, setCounts] = useState({
    students: 0,  // Initialize with 0 instead of hardcoded values
    teachers: 0,
    classes: 0
  });
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Science Fair', date: '2025-04-25' },
    { id: 2, title: 'Exam Week', date: '2025-05-01' },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  // Static data for announcements and performance
   const announcements = [
    { id: 1, text: 'All students must submit their assignments by Friday.' },
    { id: 2, text: "Teacher's workshop this weekend." }
  ];

  const studentPerformance = [
    { name: 'Ankit', score: 92 },
    { name: 'Riya', score: 88 },
    { name: 'Aman', score: 76 }
  ];

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const API_BASE = 'http://localhost:8080/api/AdminDashboard';
        const [studentsRes, teachersRes, classesRes] = await Promise.all([
          axios.get(`${API_BASE}/students/count`),
          axios.get(`${API_BASE}/faculty/count`),
          axios.get(`${API_BASE}/course/count`)
        ]);
        setCounts({
          students: studentsRes.data,
          teachers: teachersRes.data,
          classes: classesRes.data
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title.trim() === '') return;
    
    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({ title: '', date: format(new Date(), 'yyyy-MM-dd') });
    
    // Here you would typically also send to your backend
    // axios.post('/api/events', eventToAdd)
    //   .then(response => {
    //     // Update state with the event from server
    //   })
    //   .catch(error => console.error(error));
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

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
                <CardContent>{loading ? 'Loading...' : counts.students}</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>{loading ? 'Loading...' : counts.teachers}</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Classes</CardTitle>
                <CardContent>{loading ? 'Loading...' : counts.classes}</CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>Events & Calendar</SectionTitle>
            <CurrentTimeDisplay>
              Current Time: {format(currentTime, 'PPPPpppp')}
            </CurrentTimeDisplay>
            
            <EventCalendar events={events} />
            
            <EventForm onSubmit={handleAddEvent}>
              <EventInput
                type="text"
                name="title"
                placeholder="Enter Event Title"
                value={newEvent.title}
                onChange={handleEventChange}
                required
              />
              <EventInput
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleEventChange}
                required
              />
              <EventButton type="submit">Add Event</EventButton>
            </EventForm>
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