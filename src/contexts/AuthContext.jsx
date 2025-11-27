import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserInfoAPI } from "@/api/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token || null);

    async function loadUser() {
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        const data = await getUserInfoAPI();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Cannot load user!", err);
        setUser(null);
      } finally {
        setInitialized(true);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, user, setUser, initialized }}
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
