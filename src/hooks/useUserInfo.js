import { useEffect, useState } from "react";
import { getUserInfoAPI } from "@/api/userService";

export default function useUserInfo() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUserInfoAPI();
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
      } catch (err) {
        console.error("Failed to load user info:", err);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loadingUser };
}
