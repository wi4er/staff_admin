import React from 'react';
import { CommonEntity } from '../CommonTable/CommonEntity';
import { CommonTable } from '../CommonTable';
import { PropertyForm } from '../PropertyForm';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';

export class PropertyList extends React.Component<any, any> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  fetchData = (page: number, rowsPerPage: number): Promise<Response> => {
    const query: string[] = [ `limit=${rowsPerPage}` ];

    if (page) query.push(`offset=${rowsPerPage * page}`);

    return this.context.getData('property', query);
  };

  handleDelete = (id: string | number) => {
    return this.context.deleteData('property', id.toString());
  };

  columns = [ 'id', 'type' ];

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
        title="Properties"
        fetchData={this.fetchData}
        onDelete={this.handleDelete}
        columns={this.columns}
        onCell={this.renderCell}
        formComponent={PropertyForm}
      />
    );
  }
}