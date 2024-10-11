// src/components/CourseCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  };
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col"
      style={{ height: "340px", display: "flex", justifyContent: "space-between" }}
      onClick={handleCourseClick}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-32 object-cover rounded-md mb-2"
        style={{ flex: "0 0 auto" }}
      />

      {/* Nội dung khóa học */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
        <div className="text-xs text-gray-500 mb-4">
          <span>{course.duration} hours</span> &bull;{" "}
          <span>{course.totalEnrollments} students</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span
          className={`text-sm font-bold ${
            course.price === "0.00" ? "text-green-500" : "text-gray-800"
          }`}
        >
          {course.price === "0.00" ? "Free" : `$${parseFloat(course.price).toFixed(2)}`}
        </span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          View More
        </button>
      </div>
    </div>
  );
}
