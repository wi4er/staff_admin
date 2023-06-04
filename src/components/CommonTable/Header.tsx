import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

interface HeaderProps {
  selected: (number | string)[];
  length: number;
  onCheck: () => void;
  columns: string[];
}

export function Header(props: HeaderProps) {
  const { selected, length, columns, onCheck } = props;

  return (
    <TableHead>
      <TableRow style={{ background: '#1976d222' }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selected.length > 0 && selected.length < length}
            checked={selected.length === length}
            onChange={onCheck}
          />
        </TableCell>

        <TableCell component="th" scope="row"/>

        {columns.map(name => (
          <TableCell
            component="th"
            key={name}
            scope="row"
          >
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}