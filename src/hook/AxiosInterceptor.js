import axios from "axios";
import { createBrowserHistory } from "history";
const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const browserHistory = createBrowserHistory();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      alert("Your session has expired. Please log in again.");

      localStorage.removeItem("token");

      browserHistory.push("/authentication/sign-in");
      window.location.reload();

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
