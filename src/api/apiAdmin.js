import axios from "axios";
const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async (token) => {
  return axios.get(`${ADMIN_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchInstructors = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/instructors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    throw error;
  }
};

export const fetchCategories = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCourses = async (token) => {
  return axios.get(`${API_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = async (userId, newRole, token) => {
  return axios.put(
    `${ADMIN_API_URL}/users/role/${userId}`,
    { role: newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUser = async (userId, token) => {
  return axios.delete(`${ADMIN_API_URL}/users/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserInfo = async (userId, userData, token) => {
  return axios.put(`${ADMIN_API_URL}/users/info/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (courseId, courseData, token) => {
  return axios.put(`${API_URL}/courses/${courseId}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = async (courseId, token) => {
  return axios.delete(`${API_URL}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCategory = async (categoryData, token) => {
  return axios.post(`${API_URL}/categories`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourse = async (courseData, token) => {
  try {
    const response = await axios.post(`${API_URL}/courses`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData, token) => {
  return axios.put(`${API_URL}/categories/${categoryId}`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (categoryId, token) => {
  return axios.delete(`${API_URL}/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
