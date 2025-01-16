import axios from "axios";
import { createBrowserHistory } from "history";

const axiosInstance = axios.create({
  baseURL: "https://node.levanacademy.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const browserHistory = createBrowserHistory();

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
