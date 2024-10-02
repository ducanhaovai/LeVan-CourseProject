import React from "react";
import "../../css/course.css";
import placeholderImage from "../../../../assets/images/ivana-square.jpg";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <span className="course-tag">{course.category}</span>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">by {course.instructor}</p>
        <div className="course-info">
          <span>{course.duration}</span>
          <span>{course.students} Students</span>
        </div>
        <div className="course-footer">
          <span className="course-price">{course.price}</span>
          <button className="course-button">View More</button>
        </div>
      </div>
    </div>
  );
}

// Thành phần hiển thị danh sách các khóa học
function CourseList({ courses }) {
  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h2 className="course-list-title">Featured Courses</h2>
        <p className="course-list-description">Explore our Popular Courses</p>
        <button className="course-list-button">All Courses</button>
      </div>
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}

const sampleCourses = [
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$29.0 Free",
    category: "Photography",
    image: placeholderImage,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    category: "Photography",
    image: placeholderImage,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    category: "Photography",
    image: placeholderImage,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    category: "Photography",
    image: placeholderImage,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    category: "Photography",
    image: placeholderImage,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    category: "Photography",
    image: placeholderImage,
  },
];

export { CourseList, sampleCourses };
export default CourseCard;
