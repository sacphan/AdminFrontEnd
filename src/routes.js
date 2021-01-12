import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/Accounts/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ListGameView from 'src/views/Game/listgame'

const routes = (isLoggedIn)=>{
  return [

  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout />: <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard/game/:id', element: <ListGameView /> },
      { path: '*', element: <Navigate to="/404" /> }
      
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ?<MainLayout />: <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]};

export default routes;
