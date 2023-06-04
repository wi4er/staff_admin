import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

export class MainMenu extends React.Component {

  render() {
    return (
      <Box
        sx={{ width: 'auto' }}
        role="presentation"
      >
        <List>
          <Link to={'/'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon/>
                </ListItemIcon>

                <ListItemText primary='Dashboard'/>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to={'/user/user'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon/>
                </ListItemIcon>

                <ListItemText primary='User'/>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to={'/session'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon/>
                </ListItemIcon>

                <ListItemText primary={'Session'}/>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        <Divider/>

        <List>
          {[ 'All mail', 'Trash', 'Spam' ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}