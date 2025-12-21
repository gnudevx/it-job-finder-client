import React from "react";
import HomePage from "@/views/pages/HomePage/HomePage.jsx";
import Profile from "@/views/candidates/pages/profile/Profile.jsx";
import FavoritesJobs from "@/views/candidates/pages/Account/ManageJobs/FavoritesJobs/FavoritesJobs.jsx";
import AppliedJobs from "@/views/candidates/pages/Account/ManageJobs/AppliedJobs/AppliedJobs.jsx";
import RecommendJobs from "@/views/candidates/pages/Account/ManageJobs/RecommendJobs/RecommendJobs.jsx";
import PersonalInfo from "@/views/candidates/pages/Account/PersonalSettings/PersonalInfo/PersonalInfo.jsx";
import ChangePassword from "@/views/candidates/pages/Account/PersonalSettings/ChangePassword/ChangePassword.jsx";
import MyCVs from "@/views/candidates/pages/Account/ManageCVs/MyCVs/MyCVs";
import ConnectedEmployer from "@/views/candidates/pages/Account/ManageCVs/ConnectedEmployer/ConnectedEmployer";
import ViewedEmployer from "@/views/candidates/pages/Account/ManageCVs/ViewedEmployer/ViewedEmployer";
import NotificationSettings from "@/views/candidates/pages/Account/GeneralSettings/SystemNotification/NotificationList/NotificationList.jsx";
import SecuritySettings from "@/views/candidates/pages/Account/GeneralSettings/SecuritySettings/SecuritySettings.jsx";
import SystemNotification from "@/views/candidates/pages/Account/GeneralSettings/SystemNotification/SystemNotification.jsx";
import NotificationDetail from "@/views/candidates/pages/Account/GeneralSettings/SystemNotification/NotificationDetail/NotificationDetail.jsx";
import CompanyInfoPage from "@/views/candidates/components/CompanyInfo/CompanyInfoPage.jsx";

const candidateRoutes = [
    { path: "home", element: <HomePage />, meta: { title: "Home", icon: "home" } },
    { path: "profile", element: <Profile />, meta: { title: "Profile" } },
    { path: "account/favoritesjobs", element: <FavoritesJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/appliedjobs", element: <AppliedJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/recommendjobs", element: <RecommendJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/mycvs", element: <MyCVs />, meta: { title: "Home", icon: "home" } },
    { path: "account/connectedemployer", element: <ConnectedEmployer />, meta: { title: "Home", icon: "home" } },
    { path: "account/viewedemployer", element: <ViewedEmployer />, meta: { title: "Home", icon: "home" } },
    { path: "account", element: <PersonalInfo />, meta: { title: "Home", icon: "home" } },
    { path: "account/changepassword", element: <ChangePassword />, meta: { title: "Home", icon: "home" } },
    { path: "account/notifications", element: <NotificationSettings /> },
    { path: "account/security", element: <SecuritySettings /> },
    { path: "system-notification", element: <SystemNotification />, meta: { title: "Activities" } },
    { path: "system-notification/:id", element: <NotificationDetail />, meta: { title: "Notification Detail" } },
    { path: "company/:id", element: <CompanyInfoPage />, meta: { title: "Company Info" } },
];

export default candidateRoutes;