import React from 'react';
const Home = React.lazy(() => import('@view/pages/HomePage/HomePage.jsx'));
const HomeEmployer = React.lazy(() => import('@views/pages/employers/'));

const privateRoutes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/app/dashboard',
    element: Home,
  }
];

export default privateRoutes;
