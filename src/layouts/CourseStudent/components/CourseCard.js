import React from "react";
import { useNavigate } from "react-router-dom";
import "../../student/css/course.css";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const handleCourseClick = () => {
      navigate(`/courses/${course.slug}`);
  };
  return (
    <div className="course-card " onClick={handleCourseClick}>
      <div className="course-image shine-animation">
        <img src={course.thumbnail} alt={course.title} />
      </div>

      <div className="course-content">
        <ul className="meta list-wrap">
          <li className="meta-item">
            <i className="fa-regular fa-calendar"></i>
            <p className="meta-p">{course.total_sections} sections</p>

          </li>
          <li className="meta-item">
            <i className="fa-regular fa-user"></i>
            <p>{course.total_enrollments} students</p>
          </li>
          <li className="meta-item">
            <i className="fa-regular fa-clock"></i>
            <p>{course.duration} hourse</p>
          </li>
        </ul>
        <h5 className="course-title">
          <span>{course.title}</span>
        </h5>
        <ul className="courses-item-meta list-wrap">
          <li className="courses-item-tag">
            <a>{course.category_name}</a>
          </li>
          <li className="avg-rating flex items-center">
            <i className="fas fa-star"></i>
            <p>({course.rating} Review)</p>
          </li>
        </ul>
        <p className="course-instructor">
          By: {course.instructor_first_name} {course.instructor_last_name}
        </p>
        <div className="course-footer pt-4">
          <button className="course-button">
            <span>Enroll Now</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <span className="course-price">${course.price}</span>
        </div>
      </div>
    </div>
  );
}
