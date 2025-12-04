import React from "react";
import AdminDashboard from "@/views/admin/pages/Dashboard/AdminDashboard.jsx";
import ManageBusinessLicense from "@/views/admin/pages/ManageBusinessLicense/ManageBusinessLicense.jsx";
import ManageCandidates from "@/views/admin/pages/ManageCandidates/ManageCandidates.jsx";
import CandidateForm from "@/views/admin/pages/ManageCandidates/CandidateForm.jsx";
import EditCandidatePage from "@/views/admin/pages/ManageCandidates/EditCandidatePage";
import ManageRecruiment from "@/views/admin/pages/ManageRecruiments/ManageRecruiment";
import ManageEmployers from "@/views/admin/pages/ManageEmployers/ManageEmployers.jsx";
import CandidateNotification from "@/views/admin/pages/Notifications/Candidate/CandidateNotification.jsx";
import EmployerNotification from "@/views/admin/pages/Notifications/Employer/EmployerNotification.jsx";
import SupportTickets from "@/views/admin/pages/SupportTickets/SupportTickets.jsx";
const adminRoutes = [
    { path: "dashboard", element: <AdminDashboard />, meta: { title: "Dashboard" } },
    { path: "manage/recruiment", element: <ManageRecruiment />, meta: { title: "ManageRecruiment" } },
    { path: "manage/business-license", element: <ManageBusinessLicense />, meta: { title: "ManageBusinessLicense" } },
    { path: "manage/candidates", element: <ManageCandidates />, meta: { title: "ManageCandidates" } },
    { path: "manage/candidates/add", element: <CandidateForm mode="create" />, meta: { title: "Thêm Candidate" } },
    { path: "manage/candidates/:id", element: <EditCandidatePage mode="edit" />, meta: { title: "Chỉnh Sửa Candidate" } },
    { path: "manage/employers", element: <ManageEmployers />, meta: { title: "ManageEmployers" } },
    { path: "notification/candidate", element: <CandidateNotification />, meta: { title: "CandidateNotification" } },
    { path: "notification/employer", element: <EmployerNotification />, meta: { title: "EmployerNotification" } },
    { path: "manage/SupportTickets", element: <SupportTickets />, meta: { title: "EmployerNotification" } },
    // {
    //     path: "account/settings/*",
    //     element: <AccountSettings />,
    //     // children: [
    //     //     { path: "company-info", element: <CompanyInfo /> },
    //     // ],
    // },
];

export default adminRoutes;
