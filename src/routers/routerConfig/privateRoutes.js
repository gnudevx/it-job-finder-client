import React from "react";

// Candidate (user tin)
const HomeCandidate = React.lazy(() => import('@/views/candidates/pages/home/CandidateHome.jsx'));

// Employer (user dung)
const HomeEmployer = React.lazy(() =>
  import('@/views/employers/pages/dashboard/dashboard.jsx')
);

const privateRoutes = [
  {
    path: '/home',
    element: <HomeCandidate />,
  },
  {
    path: '/dashboard',
    element: <HomeEmployer />,
  },
];

export default privateRoutes;
