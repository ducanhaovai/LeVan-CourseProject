import React from 'react';
import Table from "examples/Tables/Table";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PencilIcon, TrashIcon } from 'lucide-react';

const CourseTable = ({ courses, instructors, categories, onEditCourse, onDeleteCourse }) => {
  const formatDateTime = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", options);
  };

  const columns = [
    // { name: "ID", align: "center" },
    { name: "Title", align: "center" },
    { name: "Thumbnail", align: "center" },
    { name: "Instructor", align: "center" },
    { name: "Price", align: "center" },
    { name: "Duration", align: "center" },
    { name: "Category", align: "center" },
    { name: "Published Date", align: "center" },
    { name: "Last update", align: "center" },
    { name: "Total enrollments", align: "center" },
    { name: "Status", align: "center" },
    { name: "Rating", align: "center" },
    { name: "PDF", align: "center" },
    { name: "Action", align: "center" },
  ];

  const rows = courses.map((course) => ({
    // ID: <Typography variant="caption">{course.id}</Typography>,
    Title: <Typography variant="caption">{course.title}</Typography>,
    Instructor: (
      <Typography variant="caption">
        {instructors.find((inst) => inst.id === course.instructor_id)?.username || "Unknown"}
      </Typography>
    ),
    Thumbnail: (
      <img
        src={course.thumbnail}
        alt="Course Thumbnail"
        style={{ width: "80px", height: "auto", borderRadius: "4px" }}
      />
    ),
    Price: <Typography variant="caption">${course.price}</Typography>,
    Duration: (
      <Typography variant="caption">
        {`${course.duration} hours`}
      </Typography>
    ),
    Category: (
      <Typography variant="caption">
        {categories.find((cat) => cat.id === course.category_id)?.name || "Unknown"}
      </Typography>
    ),
    "Published Date": (
      <Typography variant="caption">{formatDateTime(course.published_date)}</Typography>
    ),
    "Last update": (
      <Typography variant="caption">{formatDateTime(course.last_updated)}</Typography>
    ),
    "Total enrollments": <Typography variant="caption">{course.total_enrollments}</Typography>,
    Status: (
      <Typography variant="caption" color={course.status ? "green" : "red"}>
        {course.status ? "Published" : "Unpublished"}
      </Typography>
    ),
    Rating: <Typography variant="caption">{course.rating}</Typography>,
    PDF: (
      <a href={course.pdf_url} target="_blank" rel="noopener noreferrer">
        Download PDF
      </a>
    ),
    Action: (
      <Box display="flex" justifyContent="center">
        <button onClick={() => onEditCourse(course)} className="text-indigo-600 hover:text-indigo-900 mr-4">
          <PencilIcon className="h-5 w-5" />
        </button>
        <button onClick={() => onDeleteCourse(course.id)} className="text-red-600 hover:text-red-900">
          <TrashIcon className="h-5 w-5" />
        </button>
      </Box>
    ),
  }));

  const tableContainerStyle = {
    maxHeight: courses.length > 10 ? "600px" : "auto",
    overflowY: courses.length > 10 ? "auto" : "visible",
  };

  return (
    <Box style={tableContainerStyle}>
      <Table columns={columns} rows={rows} />
    </Box>
  );
};

export default CourseTable;
