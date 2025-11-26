import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const uid = localStorage.getItem("userId");

    setAuthToken(token || null);
    setUserId(uid || null);
    setInitialized(true);
  }, []);

  if (!initialized) return null;

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, userId, setUserId, initialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
