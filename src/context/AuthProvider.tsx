import { createContext, useContext, useState, useEffect } from "react";
// import { verifyEmail, verifyCode } from "../api/auth";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  getUser: () => User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user from local storage or API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Mark auth check as complete
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};