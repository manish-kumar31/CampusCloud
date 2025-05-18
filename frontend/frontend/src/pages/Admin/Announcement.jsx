import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent,
} from '../../styles/AnnouncementStyles';

const Announcement = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('General Announcement');
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/announcement', {
        title,
        message,
      });
      alert('Announcement sent successfully!');
      setMessage('');
      fetchLatestAnnouncement(); // refresh latest
    } catch (error) {
      console.error('Error sending announcement:', error);
      alert('Failed to send announcement');
    }
  };

  const fetchLatestAnnouncement = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/announcement');
      setLatestAnnouncement(response.data);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    }
  };

  useEffect(() => {
    fetchLatestAnnouncement();
  }, []);

  return (
    <AnnouncementContainer>
      <Sidebar />
      <Content>
        <Title>Announcement</Title>

        {/* Announcement Form */}
        <AnnouncementForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="announcement">Announcement:</Label>
            <TextArea
              required
              rows={4}
              cols={50}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Send Announcement</Button>
        </AnnouncementForm>

        {/* Display Latest Announcement */}
        <h2>Latest Announcement</h2>
        <AnnouncementList>
          {latestAnnouncement ? (
            <AnnouncementItem>
              <AnnouncementContent>
                <strong>{latestAnnouncement.title}</strong>
                <p>{latestAnnouncement.message}</p>
              </AnnouncementContent>
            </AnnouncementItem>
          ) : (
            <p>No announcements yet.</p>
          )}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;