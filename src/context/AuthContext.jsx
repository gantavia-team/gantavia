// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Backend API base
const API = "http://localhost:5000/api/auth";

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  /* =========================
     LOGIN
  ========================= */
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });

      // Backend returns: { _id, name, email, token }
      const { _id, name, email: userEmail, token } = res.data;
      const loggedInUser = { _id, name, email: userEmail };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", token);

      return loggedInUser;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.msg || error.message);
      throw error;
    }
  };

  /* =========================
     SIGNUP (auto-login after signup)
  ========================= */
  const signup = async (name, email, password) => {
    try {
      // Updated to match your backend signup route
      const res = await axios.post(`${API}/signup`, { name, email, password });

      // Backend returns: { _id, name, email, token }
      const { _id, name: userName, email: userEmail, token } = res.data;
      const newUser = { _id, name: userName, email: userEmail };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", token);

      return newUser;
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.msg || error.message);
      throw error;
    }
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /* =========================
     UPDATE PROFILE
  ========================= */
  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};