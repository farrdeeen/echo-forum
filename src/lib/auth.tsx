import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api, { setToken } from "./api";

// User type (as returned by your FastAPI backend's /auth/me)
interface User {
  _id: string;
  name: string;
  avatar_url?: string | null;
  email: string;
  title?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from /auth/me
  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<User>("/auth/me/");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount, load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    loadUser();
  }, [loadUser]);

  // Login
  const login = async (email: string, password: string) => {
    const res = await api.post<{ access_token: string; user: User }>(
      "/auth/login/",
      { email, password }
    );
    const { access_token } = res.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    await loadUser();
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    const res = await api.post<{ access_token: string; user: User }>(
      "/auth/register/",
      { name, email, password }
    );
    const { access_token } = res.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    await loadUser();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
