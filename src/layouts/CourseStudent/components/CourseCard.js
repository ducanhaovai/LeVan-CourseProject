// src/components/CourseCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../student/css/course.css";
import { GraduationCap, Clock5 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
  };
  return (
    <div className="course-card" onClick={handleCourseClick}>
      <div className="course-image">
        <img src={course.thumbnail} alt={course.title} />
        <span className="course-tag">{course.name}</span>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">
          by {course.instructor_first_name} {course.instructor_last_name}
        </p>
        <div className="course-info">
          <div className="flex items-center">
            <Clock5 />
            <span className="pl-1">{course.duration} Hours</span>
          </div>
          <div className="flex items-center">
            <GraduationCap /> <span className="pl-1">{course.total_enrollments}</span>
          </div>
        </div>
        <div className="course-footer">
          <span className="course-price">{course.price}</span>
          <button className="course-button">View More</button>
        </div>
      </div>
    </div>
  );
}
