import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Alert component for feedback
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManagerCourse() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
        setSnackbar({ open: true, message: "Failed to fetch data", severity: "error" });
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
      setSnackbar({ open: true, message: "Course updated successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to update course", severity: "error" });
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
      setSnackbar({ open: true, message: "Course deleted successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete course", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
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
      ID: <Typography variant="caption">{course.id}</Typography>,
      Title: <Typography variant="caption">{course.title}</Typography>,
      Instructor: (
        <Typography variant="caption">
          {instructors.find((inst) => inst.id === course.instructor_id)?.username || "Unknown"}
        </Typography>
      ),
      Description: <Typography variant="caption">{course.description}</Typography>,
      Price: <Typography variant="caption">${course.price}</Typography>,
      Duration: <Typography variant="caption">{`${course.duration} hours`}</Typography>,
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
          <Button variant="outlined" color="primary" onClick={() => handleEditCourse(course)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: 8 }}
            onClick={() => handleDeleteCourse(course.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    })),
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
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
            <Typography variant="h6">Course Management</Typography>
          </SoftBox>
          <Table columns={coursesTableData.columns} rows={coursesTableData.rows} />
        </Card>
      </SoftBox>
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Card style={{ padding: "20px", margin: "100px auto", width: "400px" }}>
          <Typography variant="h5" gutterBottom>
            Edit Course
          </Typography>
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
          <Box mt={2} mb={2}>
            <Typography variant="subtitle2">Category</Typography>
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
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSaveCourse}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenEditModal(false)}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Modal>
      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default ManagerCourse;
