import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow, Toolbar, Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

interface UserItem {
  id: number;
  login: string;
  group: number[];
}

interface UserListState {
  list: UserItem[];
  page: number;
  rowsPerPage: number;
}

export class UserList extends React.Component<any, UserListState> {

  state = {
    list: [],
    page: 0,
    rowsPerPage: 10,
  };

  fetchData() {
    const query: string[] = [];
    const url = ["http://localhost:8080/user"];

    query.push(`limit=${this.state.rowsPerPage}`);

    if (this.state.page) {
      query.push(`offset=${this.state.rowsPerPage * this.state.page}`);
    }

    if (query.length) {
      url.push(query.join("&"));
    }

    fetch(url.join("?"), {
      headers: {
        authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJncm91cHMiOls3NzddLCJpZCI6MX0.Fq8GWyKxMcCQKGYHfqhkC-zDd3WF0eNicrAq9_bKWeI',
      },
    }).then(res => res.json()).then(res => {
      this.setState({ list: res });
    });

  }

  componentDidMount() {
    this.fetchData();
  }

  renderRow(row: UserItem) {
    return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>

        <TableCell component="th" scope="row">
          {row.login}
        </TableCell>
      </TableRow>
    );
  }

  handleChangePage = () => {

  };

  handleChangeRowsPerPage = () => {

  };

  render() {
    return (
      <section>
        <Toolbar component={Paper}>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Users
          </Typography>

          <IconButton size="large" color="inherit">
            <AddIcon/>
          </IconButton>
          <IconButton size="large" color="inherit">
            <DeleteIcon/>
          </IconButton>
          <IconButton size="large" color="inherit">
            <SettingsIcon/>
          </IconButton>
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {this.state.list.map(this.renderRow, this)}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[ 5, 10, 25, { label: 'All', value: -1 } ]}
                  colSpan={3}
                  count={this.state.list.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  SelectProps={{
                    native: true,
                  }}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </section>
    );
  }
}