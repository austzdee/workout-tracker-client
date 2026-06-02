import axios from "axios";

/**
 * Centralized Axios instance used for all API communication.
 *
 * In development, Vite reads the API URL from `.env`.
 * In production, the deployed frontend will use the hosted backend URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Attaches the JWT access token to outgoing API requests.
 *
 * This keeps authentication logic centralized instead of repeating
 * authorization headers inside every service function.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;