import React from "react";
// const Dashboard = React.lazy(() => import("@view/employers/pages/dashboard/dashboard.jsx"));
// const Insights = React.lazy(() => import("@view/employers/pages/insights/insights.jsx"));
import Dashboard from "@view/employers/pages/dashboard/dashboard.jsx";
import Insights from "@view/employers/pages/insights/insights.jsx";
const employerRoutes = [
    { path: "dashboard", element: <Dashboard />, meta: { title: "Dashboard", icon: "home" } },
    { path: "insights", element: <Insights />, meta: { title: "Insights" } },
    //   { path: "profile", element: React.lazy(()=>import("@view/employers/pages/profile/Profile")), meta:{ title:"Profile" } },
];

export default employerRoutes;
