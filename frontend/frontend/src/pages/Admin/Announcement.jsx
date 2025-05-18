import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'
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
  return (
    <AnnouncementContainer>
      <Sidebar />
      <Content>
        <Title>Announcement</Title>
        {/* Announcement Form */}
        <AnnouncementForm >
          <FormGroup>
            <Label htmlFor="announcement">Announcement:</Label>
            <TextArea
              required
              rows={4}
              cols={50}
            />
          </FormGroup>
          <Button>Send Announcement</Button>
        </AnnouncementForm>

        {/* Display Announcements */}
        <h2>Announcements</h2>
        <AnnouncementList>
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;

