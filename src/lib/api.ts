// src/lib/api.ts
import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000", // backend URL
  withCredentials: true, // to send cookies if needed
});

// Token setter (used by auth context)
export const setToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
