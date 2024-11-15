import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import {
  fetchUsers,
  fetchCourses,
  fetchCategories,
  updateCourse,
  deleteCourse,
} from "../../api/apiAdmin";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function ManagerCourse() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, courseResponse, categoriesResponse] = await Promise.all([
          fetchUsers(token || ""),
          fetchCourses(token || ""),
          fetchCategories(token || ""),
        ]);

        const allUsers = userResponse.data.users;
        setUsers(allUsers);

        const instructorList = allUsers.filter((user) => user.role === 2);
        setInstructors(instructorList);

        setCourses(courseResponse.data);
        setCategories(categoriesResponse.data.categories);

        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setOpenEditModal(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;
    const token = localStorage.getItem("token");
    try {
      await updateCourse(editingCourse.id, editingCourse, token || "");
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === editingCourse.id ? editingCourse : course))
      );
      setOpenEditModal(false);
      alert("Course info updated successfully!");
    } catch (error) {
      alert("Failed to update course info.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await deleteCourse(courseId, token || "");
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      alert("Failed to delete course.");
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", options);
  };

  const coursesTableData = {
    columns: [
      { name: "ID", align: "center" },
      { name: "Title", align: "center" },
      { name: "Instructor", align: "center" },
      { name: "Description", align: "center" },
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
    ],
    rows: courses.map((course) => ({
      ID: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.id}
        </SoftTypography>
      ),
      Title: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.title}
        </SoftTypography>
      ),
      Instructor: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {instructors.find((inst) => inst.id === course.instructor_id)?.username || "Unknown"}
        </SoftTypography>
      ),
      Description: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.description}
        </SoftTypography>
      ),
      Price: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.price}
        </SoftTypography>
      ),
      Duration: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {`${course.duration} hours`}
        </SoftTypography>
      ),
      Category: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {categories.find((cat) => cat.id === course.category_id)?.name || "Unknown"}
        </SoftTypography>
      ),
      "Published Date": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {formatDateTime(course.published_date)}
        </SoftTypography>
      ),
      "Last update": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {formatDateTime(course.last_updated)}
        </SoftTypography>
      ),
      "Total enrollments": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.total_enrollments}
        </SoftTypography>
      ),
      Status: (
        <SoftTypography
          variant="caption"
          color={course.status ? "success" : "error"}
          fontWeight="medium"
        >
          {course.status ? "Published" : "Unpublished"}
        </SoftTypography>
      ),
      Rating: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.rating}
        </SoftTypography>
      ),
      PDF: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {course.pdf_url ? (
            <a href={course.pdf_url} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          ) : (
            "No PDF Available"
          )}
        </SoftTypography>
      ),
      Action: (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditCourse(course)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteCourse(course.id)}
          >
            Delete
          </Button>
        </div>
      ),
    })),
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Course Table</SoftTypography>
          </SoftBox>
          <Table columns={coursesTableData.columns} rows={coursesTableData.rows} />
        </Card>
      </SoftBox>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Card style={{ padding: "20px", margin: "100px auto", width: "400px" }}>
          <h2>Edit Course</h2>
          <TextField
            label="Title"
            name="title"
            value={editingCourse?.title || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={editingCourse?.description || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editingCourse?.price || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            name="duration"
            type="number"
            value={editingCourse?.duration || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <SoftBox display="flex" flexDirection="column" mt={2} mb={2}>
            <SoftTypography variant="subtitle2">Category</SoftTypography>
            <Select
              name="category_id"
              value={editingCourse?.category_id || ""}
              onChange={handleInputChange}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </SoftBox>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCourse}
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setOpenEditModal(false)}>
            Cancel
          </Button>
        </Card>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default ManagerCourse;
