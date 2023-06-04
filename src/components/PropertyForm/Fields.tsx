import React from 'react';
import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem, Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { PropertyInput } from '../../model/PropertyInput';

interface FieldsProps {
  onChange: (field: string, value: string) => void;
  item: PropertyInput;
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

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="type-select"
          value={item.type}
          label="Age"
          onChange={(event: SelectChangeEvent) => onChange('type', event.target.value)}
        >
          <MenuItem value="STRING">String</MenuItem>
          <MenuItem value="POINT">Point</MenuItem>
          <MenuItem value="USER">User</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
  );
}