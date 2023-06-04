import React from 'react';
import { DialogContent, TextField } from '@mui/material';
import { LangInput } from '.';


interface FieldsProps {
  onChange: (field: string, value: string) => void;
  item: LangInput;
}

export function Fields(props: FieldsProps) {
  const { onChange, item } = props;


  return (
    <DialogContent>
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
    </DialogContent>
  );
}