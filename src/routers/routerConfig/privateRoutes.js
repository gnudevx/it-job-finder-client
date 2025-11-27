import React from "react";

// Employer (user dung)
const HomeEmployer = React.lazy(() =>
  import('@/views/employers/pages/dashboard/Dashboard.jsx')
);

const privateRoutes = [
  {
    path: '/dashboard',
    element: <HomeEmployer />,
  }
];

export default privateRoutes;
