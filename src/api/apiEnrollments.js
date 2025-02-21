import axiosInstance from "hook/AxiosInterceptor";

const BASE_URL = process.env.REACT_APP_Enrollments_API_URL;

export const enrollCourse = async (user_id, courseSlug, course_id) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/enroll`, {
      user_id,
      course_id: courseSlug,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

export const getCourseAccess = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/courses/${id}/access`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course access:", error);
    throw error;
  }
};
export const checkEnrollmentStatus = async (slug, token) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/status/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    throw error;
  }
};

export const fetchUserEnrolledCourses = async (token) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/enrolled`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};
export const fetchAllUserEnrolledCourses = async (token) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/user-enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};
