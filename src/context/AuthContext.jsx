import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
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

  const login = async (email, password) => {
    try {
      // Replace with real API call:
      // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });

      // Mock user for now
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Replace with real API call:
      // const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });

      const mockUser = {
        id: Date.now(),
        name,
        email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

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