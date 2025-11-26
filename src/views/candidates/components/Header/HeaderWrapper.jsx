import React from "react";
import { isAuthenticated } from "@/utils/auth.js";
import HeaderGuest from "@/views/candidates/components/Header/HeaderGuest/HeaderGuest.jsx";
import HeaderCandidate from "@/views/candidates/components/Header/HeaderCandidate/HeaderCandidate.jsx";

export default function HeaderWrapper() {
    return isAuthenticated() ? <HeaderCandidate /> : <HeaderGuest />;
}
