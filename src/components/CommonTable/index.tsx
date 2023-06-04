import React from 'react';
import { Tools } from './Tools';
import { Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow } from '@mui/material';
import { Header } from './Header';
import { User } from '../../model/User';
import { Row } from './Row';
import { CommonForm } from './CommonForm';
import { Drop } from './Drop';
import { CommonEntity } from './CommonEntity';

interface CommonTableState {
  list: CommonEntity[];
  page: number;
  rowsPerPage: number;
  rowsTotal: number;
  selected: Array<number | string>;
  edit: boolean;
  editId?: number | string;
}

interface CommonTableProps {
  fetchData: (page: number, rowsPerPage: number) => Promise<Response>;
  columns: string[];
  onDelete: (id: number | string) => Promise<Response>;
  onCell: (row: CommonEntity, name: string) => React.ReactNode;
  formComponent: CommonForm;
  title: string;
}

export class CommonTable extends React.Component<CommonTableProps, CommonTableState> {
  state = {
    list: [],
    page: 0,
    rowsPerPage: 10,
    rowsTotal: 0,
    selected: [],
    edit: false,
    editId: undefined,
  } as CommonTableState;

  componentDidMount() {
    this.fetchData(this.state.page, this.state.rowsPerPage);
  }

  fetchData(page: number, rowsPerPage: number) {
    this.props.fetchData(page, rowsPerPage)
      .then(res => {
        if (res.ok) {
          this.setState({
            rowsTotal: +(res.headers.get('Content-Size') ?? 0),
          });

          return res.json().then(res => {
            this.setState({
              list: res,
            });
          });
        }
      });
  }

  handleCheck = (id: number | string) => (state: CommonTableState) => {
    const set: Set<number | string> = new Set(state.selected);

    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }

    return { selected: [ ...set ] };
  };

  handleCheckAll = () => {
    const { selected, list } = this.state;

    if (selected.length < list.length) {
      this.setState({ selected: (list as User[]).map(it => it.id) });
    } else {
      this.setState({ selected: [] });
    }
  };

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState(state => ({ page: page }));

    this.fetchData(page, this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ rowsPerPage: +event.target.value });

    this.fetchData(this.state.page, +event.target.value);
  };

  handleAdd = () => {
    this.setState({ edit: true });
  };

  handleEdit = (id: number | string) => () => {
    this.setState({
      edit: true,
      editId: id,
    });
  };

  handleDelete = (id: number | string) => () => {
    const { onDelete } = this.props;

    onDelete(id).then(res => {
      this.fetchData(this.state.page, this.state.rowsPerPage);
    });
  };

  renderForm() {
    const { edit, editId } = this.state;
    const { formComponent: Component } = this.props;

    if (!edit) {
      return null;
    }

    return (
      <Component
        onClose={() => {
          this.fetchData(this.state.page, this.state.rowsPerPage);
          this.setState({ edit: false })
        }}
        id={editId}
      />
    );
  }

  render() {
    const { list, selected, rowsTotal, rowsPerPage, page } = this.state;
    const { onCell, title, columns} = this.props;

    return (
      <section>
        <Tools
          title={title}
          onAdd={this.handleAdd}
          onDelete={() => {}}
        />

        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <Header
              columns={columns}
              selected={selected}
              length={list.length}
              onCheck={this.handleCheckAll}
            />

            <TableBody>
              {list.map((row: CommonEntity) => (
                <Row
                  key={row.id}
                  row={row}
                  selected={(selected as Array<number | string>).includes(row.id)}
                  onSelect={() => this.setState(this.handleCheck(row.id))}
                  columns={columns}
                  renderCell={onCell}
                >
                  <Drop
                    onEdit={this.handleEdit(row.id)}
                    onDelete={this.handleDelete(row.id)}
                  />
                </Row>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[ 5, 10, 25, { label: 'All', value: -1 } ]}
                  colSpan={5}
                  count={rowsTotal}
                  rowsPerPage={rowsPerPage}
                  page={page}
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

        {this.renderForm()}
      </section>
    );
  }
}