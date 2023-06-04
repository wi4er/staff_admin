import React from 'react';
import { UserList } from '../components/UserList';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { GroupList } from '../components/GroupList';
import { ContactList } from '../components/ContactList';
import { PropertyList } from '../components/PropertyList';
import { StatusList } from '../components/StatusList';
import { LangList } from '../components/LangList';

const userPages: { [key: string]: number } = {
  user: 0,
  group: 1,
  contact: 2,
  property: 3,
  status: 4,
  lang: 5,
};

export function UserPage() {
  const { entity } = useParams();
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
          value={userPages[entity ?? 'user']}
          onChange={handleChange}
        >
          <Tab label="Users"/>
          <Tab label="Groups"/>
          <Tab label="Contacts"/>
          <Tab label="Properties"/>
          <Tab label="Statuses"/>
          <Tab label="Languages"/>
        </Tabs>
      </Box>

      {entity === 'user' ? <UserList/> : null}
      {entity === 'group' ? <GroupList/> : null}
      {entity === 'contact' ? <ContactList/> : null}
      {entity === 'property' ? <PropertyList/> : null}
      {entity === 'status' ? <StatusList /> : null}
      {entity === 'lang' ? <LangList /> : null}
    </Box>
  );
}