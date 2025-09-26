// import { exact } from 'prop-types';
import React from 'react';
//import { element } from 'prop-types';
const HomePage = React.lazy(() => import('@view/pages/HomePage/HomePage.jsx'));
const LoginPage = React.lazy(() => import('@components/Login.jsx'));
const publicRoutes = [
  {
    path: '/home',
    element: HomePage,
  },
  {
    path: '/login',
    element: LoginPage,
  }
];

export default publicRoutes;
