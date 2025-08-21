// import { exact } from 'prop-types';
import React from 'react';
const HomePage = React.lazy(() => import('@view/pages/HomePage/HomePage.jsx'));
const publicRoutes = [
  {
    path: '/home',
    element: HomePage,
  },
];

export default publicRoutes;
