import React from 'react';

export const context = React.createContext<AuthContextValue>({} as AuthContextValue);

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextState {
  token: string;
}

export interface AuthContextValue {
  getData:  (entity: string, args?: string[]) => Promise<Response>;
  postData: (entity: string, data: Object) => Promise<Response>;
  putData: (entity: string, id: string, data: Object) => Promise<Response>;
  deleteData: (entity: string, id: string) => Promise<Response>;
}

export class AuthContext extends React.Component<AuthContextProps, AuthContextState> {
  state = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJncm91cHMiOls3NzddLCJpZCI6MX0.Fq8GWyKxMcCQKGYHfqhkC-zDd3WF0eNicrAq9_bKWeI',
    url: 'http://localhost:8080/',
  };

  getData = (entity: string, args: string[] = []): Promise<Response> => {
    const url = this.state.url + entity + '?' + args.join('&');

    return fetch(url, {
      headers: {
        authorization: this.state.token,
      },
    });
  }

  postData = (entity: string, data: Object): Promise<Response> => {
    const url = this.state.url + entity;

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        authorization: this.state.token,
      },
    });
  }

  putData = (entity: string, id: string, data: Object): Promise<Response> => {
    const url = this.state.url + entity + `?id=${id}`;

    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        authorization: this.state.token,
      },
    });
  }

  deleteData = (entity: string, id: string): Promise<Response> => {
    const url = this.state.url + entity + '?id=' + id;

    return fetch(url, {
      method: "DELETE",
      headers: {
        authorization: this.state.token,
      },
    });
  }

  render() {
    const {children} = this.props;

    return (
      <context.Provider value={{
        getData: this.getData,
        postData: this.postData,
        putData: this.putData,
        deleteData: this.deleteData,
      } as AuthContextValue}>
        {children}
      </context.Provider>
    );
  }
}