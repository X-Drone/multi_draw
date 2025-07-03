import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import Home from './pages/Home';
import Board from './pages/Board';
import Boards from './pages/Boards';
import Users from './pages/Users';
import User from './pages/User';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/boards', element: <Boards /> },
      { path: '/board/:id', element: <Board /> },
      { path: '/users', element: <Users /> },
      { path: '/user/:id', element: <User /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Signup /> }
    ]
  },
  //{ path: '/auth', element: <Auth /> } // do not touth
]);
