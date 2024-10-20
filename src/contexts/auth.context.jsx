// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import ApiService from "../api.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStringify = localStorage.getItem("user");
    if (userStringify) {
      const user = JSON.parse(userStringify);
      setUser(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const data = await ApiService.post("auth/login", {
        username,
        password,
      });

      setUser(data);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
