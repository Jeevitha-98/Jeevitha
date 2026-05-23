import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8085", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // SAFETY CATCHER: Intercept and force-convert any uppercase /Vendor/ path strings to lowercase /vendor/
    if (config.url && config.url.includes("/Vendor/")) {
      config.url = config.url.replace("/Vendor/", "/vendor/");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";   
    }
    return Promise.reject(error);
  }
);

export default API;
