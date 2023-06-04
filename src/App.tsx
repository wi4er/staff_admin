import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { UserPage } from './pages/UserPage';
import { Layout } from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthContext } from './context/AuthContext';

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
        path: '/user/:entity',
        element: <UserPage/>,
      },
    ],
    element: <Layout/>,
  },
]);

function App() {
  return (
    <ThemeProvider theme={createTheme({})}>
      <AuthContext>
        <RouterProvider router={router}/>
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
