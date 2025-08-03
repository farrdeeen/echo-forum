// src/lib/auth.tsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api, { setToken } from "./api";

// User type from FastAPI response
interface User {
  _id: string;
  name: string;
  avatar_url?: string | null;
  email: string;
  title?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from /auth/me
  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<User>("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    loadUser();
  }, [loadUser]);

  // Login
  const login = async (email: string, password: string) => {
  const res = await api.post<{ token: string }>("/auth/login", { email, password });
  const { token } = res.data;
  localStorage.setItem("token", token);
  setToken(token);
  await loadUser();
};

const register = async (name: string, email: string, password: string) => {
  const res = await api.post<{ token: string }>("/auth/register", { name, email, password });
  const { token } = res.data;
  localStorage.setItem("token", token);
  setToken(token);
  await loadUser();
};

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
