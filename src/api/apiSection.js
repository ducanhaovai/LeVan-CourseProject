import axios from "axios";
import axiosInstance from "hook/AxiosInterceptor";
const BASE_URL = process.env.REACT_APP_Payments_API_URL;

export const fetchSectionsByCourseId = (courseId, token) => {
  return axiosInstance.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSectionById = (sectionId, token) => {
  return axiosInstance.get(`http://localhost:3001/api/sections/${sectionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
