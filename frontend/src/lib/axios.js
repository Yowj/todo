import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : `${import.meta.env.VITE_API_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // Add timeout for iOS
});

// Add iOS-specific interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // iOS Safari sometimes needs explicit cookie handling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Force cookie recognition on iOS
      if (response.headers['set-cookie']) {
        document.cookie = response.headers['set-cookie'];
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;