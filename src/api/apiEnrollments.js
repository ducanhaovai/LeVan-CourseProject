import axios from "axios";

const BASE_URL = process.env.REACT_APP_Enrollments_API_URL;

export const getAllEnrollments = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
export const getEnrollmentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createEnrollment = async (enrollmentData) => {
  const response = await axios.post(BASE_URL, enrollmentData);
  return response.data;
};

export const updateEnrollment = async (id, enrollmentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, enrollmentData);
  return response.data;
};

export const deleteEnrollment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
