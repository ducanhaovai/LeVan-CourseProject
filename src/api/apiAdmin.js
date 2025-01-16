import axiosInstance from "hook/AxiosInterceptor";
import axios from "axios";
const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async (token) => {
  return axiosInstance.get(`${ADMIN_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchUsersByID = async (userId, token) => {
  return axiosInstance.get(`${ADMIN_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchInstructors = async (token) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/instructors`, {
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
    const response = await axiosInstance.get(`${API_URL}/categories`, {
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
export const fetchCategoriesByID = async (id, token) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/categories/${id}`, {
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
  try {
    const courseResponse = await axiosInstance.get(`${API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return courseResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchCoursesId = async (courseId, token) => {
  try {
    const courseResponse = await axiosInstance.get(`${API_URL}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return courseResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchCourseBySlug = async (slug, token) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/courses/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) {
      throw new Error("API did not return 'data' field.");
    }

    return response; // Trả về toàn bộ response nếu `data` tồn tại
  } catch (error) {
    console.error("Error fetching course by slug:", error.message);
    throw error;
  }
};

export const fetchCourseTitleById = async (id) => {
  try {
    const response = await axiosInstance.get(`https://node.levanacademy.com/courses/${id}`);
    return response.data.title;
  } catch (error) {
    console.error("Error fetching course title:", error);
    return null;
  }
};
export const fetchCourseTitleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/courses/${slug}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching course title:", error);
    throw error;
  }
};

export const updateUserRole = async (userId, newRole, token) => {
  return axiosInstance.put(
    `${ADMIN_API_URL}/users/role/${userId}`,
    { role: newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getCourseDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};
export const deleteUser = async (userId, token) => {
  return axiosInstance.delete(`${ADMIN_API_URL}/users/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserInfo = async (userId, userData, token) => {
  return axiosInstance.put(`${ADMIN_API_URL}/users/info/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (courseId, courseData, token) => {
  return axiosInstance.put(`${API_URL}/courses/${courseId}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = async (courseId, token) => {
  return axiosInstance.delete(`${API_URL}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCategory = async (categoryData, token) => {
  return axiosInstance.post(`${API_URL}/categories`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourse = async (courseData, token) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/courses`, courseData, {
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
  return axiosInstance.put(`${API_URL}/categories/${categoryId}`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (categoryId, token) => {
  return axiosInstance.delete(`${API_URL}/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchUserEnrolledCourses = async (token) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/courses/enrolled`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};
