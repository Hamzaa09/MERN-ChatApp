import axios from "axios";

export const axoisInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
