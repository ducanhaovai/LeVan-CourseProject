import axios from "axios";
import axiosInstance from "hook/AxiosInterceptor";
const BASE_URL = process.env.REACT_APP_Payments_API_URL;
const API_URL = process.env.REACT_APP_API_URL;
export const fetchSectionsByCourseId = (courseId, token) => {
  return axiosInstance.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSectionById = (sectionId, token) => {
  return axiosInstance.get(`${API_URL}/api/sections/${sectionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
