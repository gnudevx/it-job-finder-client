import React from "react";
import CandidateHome from "@view/candidates/pages/home/CandidateHome.jsx";
import Profile from "@view/candidates/pages/profile/Profile.jsx";

const candidateRoutes = [
    { path: "home", element: <CandidateHome />, meta: { title: "Home", icon: "home" } },
    { path: "profile", element: <Profile />, meta: { title: "Profile" } },
];

export default candidateRoutes;