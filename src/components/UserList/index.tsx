import React from 'react';
import { UserForm } from '../UserForm';
import { User } from '../../model/User';
import { CommonTable } from '../CommonTable';
import { CommonEntity } from '../CommonTable/CommonEntity';

interface UserListState {
}

export class UserList extends React.Component<any, UserListState> {

  fetchData = (page: number, rowsPerPage: number): Promise<Response> => {
    const query: string[] = [];
    const url = [ 'http://localhost:8080/user' ];

    query.push(`limit=${rowsPerPage}`);

    if (page) {
      query.push(`offset=${rowsPerPage * page}`);
    }

    if (query.length) {
      url.push(query.join('&'));
    }

    return fetch(url.join('?'), {
      headers: {
        authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJncm91cHMiOls3NzddLCJpZCI6MX0.Fq8GWyKxMcCQKGYHfqhkC-zDd3WF0eNicrAq9_bKWeI',
      },
    });
  }

  handleDelete = (id: string | number): Promise<Response> => {
    return fetch(`http://localhost:8080/user?id=${id}`, {
      method: "DELETE",
      headers: {
        authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJncm91cHMiOls3NzddLCJpZCI6MX0.Fq8GWyKxMcCQKGYHfqhkC-zDd3WF0eNicrAq9_bKWeI',
      },
    });
  }

  columns = ['id', 'login', 'groups']

  renderCell = (row: CommonEntity, name: string) => {
    return (
      <div>
        {row[name as keyof CommonEntity]}
      </div>
    );
  }

  render() {
    return (
      <CommonTable
        title="Users"
        fetchData={this.fetchData}
        onDelete={this.handleDelete}
        columns={this.columns}
        onCell={this.renderCell}
        formComponent={UserForm}
      />
    );
  }
}