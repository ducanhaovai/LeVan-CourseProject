import axios from "axios";

export const enrollCourse = (courseId, userId, paymentProof, token) => {
  return axios.post(
    "http://localhost:3001/enrollments",
    {
      course_id: courseId,
      user_id: userId,
      status: "pending",
      payment_proof: paymentProof,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const checkAccess = (userId, sectionId, token) => {
  return axios.get(`http://localhost:3001/enrollments/access`, {
    params: { userId, sectionId },
    headers: { Authorization: `Bearer ${token}` },
  });
};
