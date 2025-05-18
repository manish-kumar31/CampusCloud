import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent,
} from '../../styles/AnnouncementStyles';

const Announcement = () => {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);

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