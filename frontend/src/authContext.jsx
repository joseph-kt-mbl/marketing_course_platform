import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshAccessToken = async () => {
    const res = await fetch(`/api/users/refresh`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (!res.ok) return null;

    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  };

  const fetchProfile = async (token) => {
    return await fetch(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const checkUser = async () => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        token = await refreshAccessToken();
      }

      if (!token) return;

      let res = await fetchProfile(token);

      // If token expired → try refresh once
      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) return;

        res = await fetchProfile(token);
      }

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);