import {
  Checkbox,
  IconButton,
  Menu,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import { User } from '../../model/User';
import { CommonEntity } from './CommonEntity';

interface RowProps {
  row: CommonEntity;
  selected: boolean;
  onSelect: () => void;
  columns: string[];
  renderCell: (row: CommonEntity, name: string) => React.ReactNode;
  children: React.ReactNode;
}

export function Row(props: RowProps) {
  const { row, selected, onSelect, columns, renderCell, children } = props;
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const ref = React.useRef();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <TableRow key={row.id}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selected}
          onChange={() => onSelect()}
        />
      </TableCell>

      <TableCell
        component="td"
        scope="row"
        ref={ref}
      >
        <IconButton
          aria-label="expand row"
          size="small"
          style={{
            position: 'relative',
          }}
          onClick={handleClick}
        >
          <MoreIcon/>
        </IconButton>

        <Menu
          open={Boolean(anchorEl)}
          anchorEl={ref.current}
          onClose={handleClose}
          id="basic-menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {children}
        </Menu>
      </TableCell>

      {columns.map(name => (
        <TableCell
          key={name}
          component="td"
          scope="row"
        >
          {renderCell(row, name)}
        </TableCell>
      ))}
    </TableRow>
  );
}