// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // or your backend URL
});

export function setToken(token?: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
