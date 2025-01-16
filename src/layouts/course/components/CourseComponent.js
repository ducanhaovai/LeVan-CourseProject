import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import SectionComponent from "./SectionComponent";

const CourseComponent = ({ course, instructors, categories, onEditCourse, onDeleteCourse }) => {
  const getInstructorName = (id) =>
    instructors.find((inst) => inst.id === id)?.username || "Unknown";

  const getCategoryName = (id) =>
    categories.find((category) => category.id === id)?.name || "Unknown";

  return (
    <Card style={{ padding: "16px", marginBottom: "16px" }}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>
        <strong>Instructor:</strong> {getInstructorName(course.instructor_id)}
      </p>
      <p>
        <strong>Category:</strong> {getCategoryName(course.category_id)}
      </p>
      <p>
        <strong>Price:</strong> ${course.price}
      </p>
      <p>
        <strong>Duration:</strong> {course.duration} hours
      </p>
      <h4>Sections</h4>
      {(course.sections || []).map((section) => (
        <SectionComponent key={section.id} section={section} />
      ))}
      <div style={{ marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEditCourse(course)}
          style={{ marginRight: "8px" }}
        >
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDeleteCourse(course.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default CourseComponent;
