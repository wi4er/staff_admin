import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MainMenu } from '../MainMenu';

export function Layout() {
  const [ open, setOpen ] = React.useState(false);

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon/>
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Staff admin
          </Typography>

          <Button color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={'top'}
        open={open}
        onClose={() => setOpen(false)}
      >
        <MainMenu/>
      </Drawer>

      <Outlet/>
    </main>
  );
}