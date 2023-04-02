import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { UserPage } from './pages/UserPage';
import { Layout } from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        index: true,
        element: <MainPage/>,
      },
      {
        path: '/user',
        element: <Navigate replace to="/user/user"/>,
      },
      {
        path: '/user/:page',
        element: <UserPage/>,
      },
    ],
    element: <Layout/>,
  },
]);

function App() {
  return (
    <ThemeProvider theme={createTheme({})}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
