import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/";

// Response interceptor to log errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios request failed:");
    console.error("URL:", error.config?.url);
    console.error("Method:", error.config?.method?.toUpperCase());

    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Status Text:", error.response.statusText);
      console.error("Response Data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server");
    } else {
      // Error in setting up the request
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);
