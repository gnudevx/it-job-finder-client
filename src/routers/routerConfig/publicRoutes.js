// import { exact } from 'prop-types';
import React from 'react';
//import { element } from 'prop-types';
import HomePage from "@/views/pages/HomePage/HomePage.jsx";
import { element } from 'prop-types';
const LoginPage = React.lazy(() => import('@components/Login.jsx'));
const RegisterPage = React.lazy(() => import('@/views/pages/Authentication/Register.jsx'))
const publicRoutes = [
  {
    path: '/home',
    element: HomePage,
  },
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/register',
    element: RegisterPage,
  }
];

export default publicRoutes;
