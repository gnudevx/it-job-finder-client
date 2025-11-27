import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RootRedirect = () => {
  const { authToken, user } = useAuth();

  // Nếu chưa đăng nhập → về /home
  if (!authToken) return <Navigate to="/home" replace />;

  // Nếu đăng nhập → redirect theo role
  if (user?.role === "employer") return <Navigate to="/employer/dashboard" replace />;
  if (user?.role === "candidate") return <Navigate to="/candidate/dashboard" replace />;

  // fallback
  return <Navigate to="/home" replace />;
};

export default RootRedirect;
