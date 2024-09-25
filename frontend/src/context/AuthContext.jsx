// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// Auth Provider
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token, isAuthenticated: true });
    }
  }, []);

  const login = async (user) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      user
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    setAuth({ token, isAuthenticated: true });
  };

  const signup = async (user) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      user
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    setAuth({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
