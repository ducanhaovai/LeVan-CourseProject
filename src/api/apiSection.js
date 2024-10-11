import axios from "axios";
const BASE_URL = process.env.REACT_APP_Payments_API_URL;

export const fetchSectionsByCourseId = (courseId, token) => {
  return axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSectionById = (sectionId, token) => {
  return axios.get(`http://localhost:3001/api/sections/${sectionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
