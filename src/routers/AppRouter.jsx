import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";
import PropTypes from "prop-types";
import HomePage from "@/views/pages/HomePage/HomePage.jsx";
import CandidateApp from "../routers/candidate/CandidateApp";
import EmployerApp from "../routers/employer/EmployerApp";
import LoginPage from "@/views/pages/Login/Login.jsx";
import privateRoutes from "./routerConfig/privateRoutes";

// Hàm kiểm tra trạng thái đăng nhập
const isLoggedIn = () => !!localStorage.getItem("authToken");

// Component loading riêng
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen text-lg font-medium">
    Loading...
  </div>
);

// Route bảo vệ (chặn người chưa đăng nhập)
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
          {/* Trang mặc định */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />

          {/* Trang đăng nhập */}
          <Route path="/login" element={<LoginPage />} />

          {/* Trang home cho candidate (user tin) */}
          <Route 
            path="/candidate/*" 
            element={<PrivateRoute element={<CandidateApp />} />} />

          {/* Portal cho employer (user dung) */}
          <Route
            path="/employer/*"
            element={<PrivateRoute element={<EmployerApp />} />}
          />

          {/* Render tất cả các private routes */}
          {privateRoutes.map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={<PrivateRoute element={element} />} />
          ))}

          {/* Không tồn tại */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
