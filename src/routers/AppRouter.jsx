import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";
import PropTypes from "prop-types";

import HomePage from "@/views/pages/HomePage/HomePage";
import CandidateApp from "../routers/candidate/CandidateApp";
import EmployerApp from "../routers/employer/EmployerApp";
import AdminApp from "./admin/AdminApp";
import LoginPage from "@/views/pages/Authentication/Login.jsx";
import RegisterPage from "@/views/pages/Authentication/Register.jsx";
import GuestLayout from "@/views/candidates/layouts/GuestLayout/GuestLayout";
import privateRoutes from "./routerConfig/privateRoutes";
import JobDetail from "@/views/candidates/pages/JobDetail/JobDetail";
import { useAuth } from "@/contexts/AuthContext";
import RootRedirect from "./RootRedirect";
import CompanyInfoPage from "@/views/candidates/components/CompanyInfo/CompanyInfoPage";
import ConnectPage from "@/views/employers/pages/ConnectPage/ConnectPage.jsx";
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen text-lg font-medium">
    Loading...
  </div>
);

const PrivateRoute = ({ element }) => {
  const { authToken } = useAuth();

  if (authToken === null || authToken === undefined)
    return <Navigate to="/login" replace />;

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export const AppRouter = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Suspense fallback={<LoadingScreen />}>

        <Routes>

          {/* Guest layout */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/company/:id" element={<CompanyInfoPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/candidate/connect" element={<ConnectPage role="candidate" />} />
          <Route path="/candidate/connect/:id" element={<ConnectPage role="candidate" />} />
          {/* Candidate layout */}
          <Route
            path="/candidate/*"
            element={<PrivateRoute element={<CandidateApp />} />}
          />
          <Route path="/employer/connect" element={<ConnectPage role="employer" />} />
          <Route path="/employer/connect/:id" element={<ConnectPage role="employer" />} />
          {/* Employer */}
          <Route
            path="/employer/*"
            element={<PrivateRoute element={<EmployerApp />} />}
          />

          {/* Admin */}
          <Route
            path="/admin/*"
            element={<PrivateRoute element={<AdminApp />} />}
          />

          {/* Private routes khác */}
      
          {privateRoutes.map(({ path, element }, idx) => (
            <Route
            key={idx}
            path={path}
            element={<PrivateRoute element={element} />}
            />
          ))}

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />

        </Routes>

      </Suspense>
    </>
  );
};
