import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const RootRedirect = () => {
  const auth = isAuthenticated(); // true/false
  // nếu đã đăng nhập -> home, chưa -> login
  return auth ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;

};

export default RootRedirect;