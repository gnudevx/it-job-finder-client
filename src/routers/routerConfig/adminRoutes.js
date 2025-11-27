import React from "react";
import AdminDashboard from "@/views/admin/pages/Dashboard/AdminDashboard.jsx";
import ManageBusinessLicense from "@/views/admin/pages/ManageBusinessLicense/ManageBusinessLicense.jsx";
import ManageCandidates from "@/views/admin/pages/ManageCandidates/ManageCandidates.jsx";
import ManageEmployers from "@/views/admin/pages/ManageEmployers/ManageEmployers.jsx";
import CandidateNotification from "@/views/admin/pages/Notifications/Candidate/CandidateNotification.jsx";
import EmployerNotification from "@/views/admin/pages/Notifications/Employer/EmployerNotification.jsx";

const adminRoutes = [
    { path: "dashboard", element: <AdminDashboard />, meta: { title: "Dashboard" } },
    { path: "manage/business-license", element: <ManageBusinessLicense />, meta: { title: "ManageBusinessLicense" } },
    { path: "manage/candidates", element: <ManageCandidates />, meta: { title: "ManageCandidates" } },
    { path: "manage/employers", element: <ManageEmployers />, meta: { title: "ManageEmployers" } },
    { path: "notification/candidate", element: <CandidateNotification />, meta: { title: "CandidateNotification" } },
    { path: "notification/employer", element: <EmployerNotification />, meta: { title: "EmployerNotification" } },
    // {
    //     path: "account/settings/*",
    //     element: <AccountSettings />,
    //     // children: [
    //     //     { path: "company-info", element: <CompanyInfo /> },
    //     // ],
    // },
];

export default adminRoutes;
