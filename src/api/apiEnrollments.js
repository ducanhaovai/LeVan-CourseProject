import axios from "axios";

const BASE_URL = process.env.REACT_APP_Enrollments_API_URL;

export const enrollCourse = async (user_id, course_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/enroll`, {
      user_id,
      course_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

export const getCourseAccess = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${id}/access`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course access:", error);
    throw error;
  }
};
export const checkEnrollmentStatus = async (user_id, course_id) => {
  try {
    const response = await axios.get(`${API_URL}/status/${user_id}/${course_id}`);
    return response.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    throw error;
  }
};
