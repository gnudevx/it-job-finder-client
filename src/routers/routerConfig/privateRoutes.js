import React from 'react';
const Home = React.lazy(() => import('@view/pages/HomePage/HomePage.jsx'));

const privateRoutes = [
  {
    path: '/',
    element: Home,
  }
];

export default privateRoutes;
