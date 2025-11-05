import React from "react";

// Candidate (user tin)
const Home = React.lazy(() => import('@/views/pages/HomePage/HomePage.jsx'));

// Employer (user dung)
const HomeEmployer = React.lazy(() =>
  import('@/views/employers/pages/dashboard/dashboard.jsx')
);

const privateRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <HomeEmployer />,
  },
];

export default privateRoutes;
