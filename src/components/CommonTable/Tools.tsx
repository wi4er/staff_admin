import React from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';

interface ToolsProps {
  title: string;
  onAdd: () => void;
  onDelete: () => void;
}

export function Tools(props: ToolsProps) {
  const { onAdd, onDelete, title } = props;

  return (
    <Toolbar component={Paper}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {title}
      </Typography>

      <IconButton
        size="large"
        color="inherit"
        onClick={onAdd}
      >
        <AddIcon/>
      </IconButton>

      <IconButton
        size="large"
        color="inherit"
        onClick={onDelete}
      >
        <DeleteIcon/>
      </IconButton>

      <IconButton size="large" color="inherit">
        <SettingsIcon/>
      </IconButton>
    </Toolbar>
  );
}