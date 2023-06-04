import React from 'react';
import { CommonEntity } from '../CommonTable/CommonEntity';
import { CommonTable } from '../CommonTable';
import { LangForm } from '../LangForm';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';

export class LangList extends React.Component<any, any> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  fetchData = (page: number, rowsPerPage: number): Promise<Response> => {
    const query: string[] = [ `limit=${rowsPerPage}` ];

    if (page) query.push(`offset=${rowsPerPage * page}`);

    return this.context.getData('lang', query);
  };

  handleDelete = (id: string | number): Promise<Response> => {
    return this.context.deleteData('lang', id.toString());
  };

  columns = [ 'id' ];

  renderCell = (row: CommonEntity, name: string) => {
    return (
      <div>
        {row[name as keyof CommonEntity]}
      </div>
    );
  };

  render() {
    return (
      <CommonTable
        title="Languages"
        fetchData={this.fetchData}
        onDelete={this.handleDelete}
        columns={this.columns}
        onCell={this.renderCell}
        formComponent={LangForm}
      />
    );
  }
}