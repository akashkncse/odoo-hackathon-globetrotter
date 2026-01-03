import axios from "axios";

// 1. Create the instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1", // Adjust if your prefix is different
});

// 2. The Interceptor: Automatically attaches the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Ensure you saved it here on Login!
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
