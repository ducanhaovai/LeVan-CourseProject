import { enrollCourse } from "api/apiEnrollments";
import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CourseSidebar = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    try {
      // Enroll the user in the course
      const enrollmentData = await enrollCourse(currentUser.id, course.id);

      if (enrollmentData) {
        navigate(`/checkout?courseId=${course.id}`);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden sticky top-4">
      <img src={course.thumbnail} alt="Course preview" className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-gray-900">${course.price}</span>
          <span className="text-lg font-medium text-gray-500 line-through">$89.0</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          onClick={handleEnroll}
        >
          Enroll Now
        </button>
        <div className="mt-4 text-center text-sm text-gray-500">30-Day Money-Back Guarantee</div>
      </div>
    </div>
  );
};

export default CourseSidebar;
