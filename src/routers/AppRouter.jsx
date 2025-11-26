import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";
import PropTypes from "prop-types";

import HomePage from "@/views/pages/HomePage/HomePage";
import CandidateApp from "../routers/candidate/CandidateApp";
import EmployerApp from "../routers/employer/EmployerApp";
import LoginPage from "@/views/pages/Authentication/Login.jsx";
import RegisterPage from "@/views/pages/Authentication/Register.jsx";
import GuestLayout from "@/views/candidates/layouts/GuestLayout/GuestLayout";
import privateRoutes from "./routerConfig/privateRoutes";
import JobDetail from "@/views/candidates/pages/JobDetail/JobDetail";

const isLoggedIn = () => !!localStorage.getItem("authToken");
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen text-lg font-medium">
    Loading...
  </div>
);

const PrivateRoute = ({ element }) =>
  isLoggedIn() ? element : <Navigate to="/login" replace />;

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
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/job/:id" element={<JobDetail />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Candidate layout */}
          <Route
            path="/candidate/*"
            element={<PrivateRoute element={<CandidateApp />} />}
          />

          {/* Employer */}
          <Route
            path="/employer/*"
            element={<PrivateRoute element={<EmployerApp />} />}
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
