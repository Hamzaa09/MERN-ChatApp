import axios from "axios";

export const axoisInstance = axios.create({
  // baseURL: import.meta.env.VITE_URL,
  baseURL: "http://mern-chat-app-iota-opal.vercel.app",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
