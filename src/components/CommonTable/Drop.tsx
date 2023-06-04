import React from 'react';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface MenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function Drop(props: MenuProps) {
  const { onEdit, onDelete } = props;

  return (
    <MenuList>
      <MenuItem>Active</MenuItem>

      <Divider/>

      <MenuItem onClick={onEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small"/>
        </ListItemIcon>

        <ListItemText>
          Edit
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon fontSize="small"/>
        </ListItemIcon>

        Delete
      </MenuItem>
    </MenuList>
  );
}