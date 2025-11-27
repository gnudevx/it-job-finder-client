import React from "react";

// Employer (user dung)
const HomeEmployer = React.lazy(() =>
  import('@/views/employers/pages/dashboard/Dashboard.jsx')
);

const HomeAdmin = React.lazy(() =>
  import('@/views/admin/pages/Dashboard/AdminDashboard.jsx')
);

const privateRoutes = [
  {
    path: '/dashboard',
    element: <HomeEmployer />,
  },
  {
    path: '/admin',
    element: <HomeAdmin />,
  }
];

export default privateRoutes;
