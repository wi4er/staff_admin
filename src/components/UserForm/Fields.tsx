import React from 'react';
import { DialogContent, DialogContentText, TextField } from '@mui/material';
import { UserInfo } from 'os';
import { UserInput } from './index';


interface FieldsProps {
  onChange: (field: string, value: string) => void;
  item: UserInput;
}

export function Fields(props: FieldsProps) {
  const { onChange, item } = props;


  return (
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>

      <TextField
        autoFocus
        margin="dense"
        id="id"
        label="User id"
        fullWidth
        type="input"
        variant="standard"
        value={item.id}
        onChange={event => onChange('id', event.target.value)}
      />

      <TextField
        margin="dense"
        id="name"
        label="User login"
        fullWidth
        variant="standard"
        value={item.login}
        onChange={event => onChange('login', event.target.value)}
      />
    </DialogContent>
  );
}