import React from "react";
import CandidateHome from "@views/candidates/pages/home/CandidateHome.jsx";
import Profile from "@views/candidates/pages/profile/Profile.jsx";
import SavedJobs from "@/views/candidates/pages/Account/ManageJobs/SavedJobs/SavedJobs.jsx";
import AppliedJobs from "@views/candidates/pages/Account/ManageJobs/AppliedJobs/AppliedJobs.jsx";
import RecommendJobs from "@views/candidates/pages/Account/ManageJobs/RecommendJobs/RecommendJobs.jsx";
import PersonalInfo from "@views/candidates/pages/Account/PersonalSettings/PersonalInfo/PersonalInfo.jsx";
import ChangePassword from "@views/candidates/pages/Account/PersonalSettings/ChangePassword/ChangePassword.jsx";
import MyCVs from "@/views/candidates/pages/Account/ManageCVs/MyCVs/MyCVs";
import ConnectedEmployer from "@/views/candidates/pages/Account/ManageCVs/ConnectedEmployer/ConnectedEmployer";
import ViewedEmployer from "@/views/candidates/pages/Account/ManageCVs/ViewedEmployer/ViewedEmployer";

const candidateRoutes = [
    { path: "home", element: <CandidateHome />, meta: { title: "Home", icon: "home" } },
    { path: "profile", element: <Profile />, meta: { title: "Profile" } },
    { path: "account/savedjobs", element: <SavedJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/appliedjobs", element: <AppliedJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/recommendjobs", element: <RecommendJobs />, meta: { title: "Home", icon: "home" } },
    { path: "account/mycvs", element: <MyCVs />, meta: { title: "Home", icon: "home" } },
    { path: "account/connectedemployer", element: <ConnectedEmployer />, meta: { title: "Home", icon: "home" } },
    { path: "account/viewedemployer", element: <ViewedEmployer />, meta: { title: "Home", icon: "home" } },
    { path: "account", element: <PersonalInfo />, meta: { title: "Home", icon: "home" } },
    { path: "account/changepassword", element: <ChangePassword />, meta: { title: "Home", icon: "home" } },
];

export default candidateRoutes;