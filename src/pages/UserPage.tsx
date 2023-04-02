import React from 'react';
import { UserList } from '../components/UserList';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { GroupList } from '../components/GroupList';
import { ContactList } from '../components/ContactList';

const userPages: { [key: string]: number } = {
  user: 0,
  group: 1,
  contact: 2,
};

export function UserPage() {
  const { page } = useParams();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    for (const i in userPages) {
      if (userPages[i] === newValue) {
        navigate(`/user/${i}`);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={userPages[page ?? 'user']}
          onChange={handleChange}
        >
          <Tab label="Users"/>
          <Tab label="Groups"/>
          <Tab label="Contacts"/>
        </Tabs>
      </Box>

      {page === 'user' ? <UserList/> : null}
      {page === 'group' ? <GroupList/> : null}
      {page === 'contact' ? <ContactList/> : null}
    </Box>
  );
}