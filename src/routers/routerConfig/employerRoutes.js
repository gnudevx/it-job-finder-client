import React from "react";
// const Dashboard = React.lazy(() => import("@view/employers/pages/dashboard/dashboard.jsx"));
// const Insights = React.lazy(() => import("@view/employers/pages/insights/insights.jsx"));
import Dashboard from "@/views/employers/pages/dashboard/dashboard.jsx";
import Insights from "@/views/employers/pages/insights/insights.jsx";
import AccountSettings from "@/views/employers/pages/AccountSetting/AccountSettings.jsx"
import AccountAcctivities from "@/views/employers/pages/AccountActivities/AccountActivities.jsx";
import PhoneVerify from "@/views/employers/components/Account/PhoneVerify/PhoneVerify.jsx";
import SystemNotification from "@/views/employers/pages/SystemNotification/SystemNotification.jsx";
import SupportBox from "@/views/employers/pages/SupportBox/SupportBox.jsx";
import CreateJob from "@/views/employers/pages/CreateJob/CreateJob.jsx";
import JobManagementPage from "@/views/employers/pages/JobManagementPage/JobManagementPage";
import CampaignsPage from "@/views/employers/pages/CampaignsPage/CampaignsPage";
import ManageAppliedCV from "@/views/employers/pages/ManageAppliedCV/ManageAppliedCV.jsx"

// import CompanyInfo from "@/views/employers/components/CompanyInfo/CompanyInfo";
const employerRoutes = [
    { path: "dashboard", element: <Dashboard />, meta: { title: "Dashboard" } },
    { path: "insights", element: <Insights />, meta: { title: "Insights" } },
    { path: "account/phone-verify", element: <PhoneVerify />, meta: { title: "Insights" } },
    { path: "account/activities/*", element: <AccountAcctivities />, meta: { title: "Activities" } },
    { path: "system-notification", element: <SystemNotification />, meta: { title: "Activities" } },
    { path: "support-box/*", element: <SupportBox />, meta: { title: "SupportBox" } },
    { path: "jobs/create", element: <CreateJob />, meta: { title: "CreateJob" } },
    { path: "jobs/", element: <JobManagementPage />, meta: { title: "JobManagementPage" } },
    { path: "recruitment-campaigns", element: <CampaignsPage />, meta: { title: "recruitment-campaigns" } },
    { path: "jobs/edit/:jobId", element: <CreateJob />, meta: { title: "Edit Job" } },
    { path: "cvs-management/candidate-connection", element: <ManageAppliedCV />, meta: { title: "Manage Applied CVs" } },
    {
        path: "account/settings/*",
        element: <AccountSettings />,
        // children: [
        //     { path: "company-info", element: <CompanyInfo /> },
        // ],
    },
];
export default employerRoutes;
