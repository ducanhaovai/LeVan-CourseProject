import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {
  fetchUsers,
  fetchCourses,
  fetchCategories,
  updateCourse,
  deleteCourse,
} from "../../api/apiAdmin";
import CourseTable from "./components/CourseTable";
import EditCourseModal from "./components/EditCourse/edit-course-modal";
import FeedbackAlert from "./components/FeedbackAlert";
import LoadingScreen from "./components/LoadingScreen";
import AddCourse from "./components/AddCourse/AddCourse";
import AddCategory from "./components/AddCategory";
import { Button } from "layouts/student/button";

function ManagerCourse() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddCourse, setOpenAddCourse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("ManagerCourse: fetching data with token =", token);
      setLoading(true);
      try {
        const [userResponse, courseResponse, categoriesResponse] = await Promise.all([
          fetchUsers(token || ""),
          fetchCourses(token || ""),
          fetchCategories(token || ""),
        ]);
        console.log("User response:", userResponse.data);
        console.log("Course response:", courseResponse.data);
        console.log("Categories response:", categoriesResponse.data);

        const allUsers = userResponse.data.users;
        setUsers(allUsers);
        setInstructors(allUsers.filter((user) => user.role === 2));
        setCourses(courseResponse.data);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("ManagerCourse: error fetching data:", error);
        setSnackbar({ open: true, message: "Failed to fetch data", severity: "error" });
      } finally {
        setLoading(false);
        console.log("ManagerCourse: loading finished");
      }
    };
    fetchData();
  }, []);

  const handleEditCourse = (course) => {
    console.log("ManagerCourse: handleEditCourse =>", course);
    setEditingCourse(course);
    setOpenEditModal(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) {
      console.log("ManagerCourse: handleSaveCourse => no editingCourse set");
      return;
    }
    const token = localStorage.getItem("token");
    console.log("ManagerCourse: handleSaveCourse => updating course with ID =", editingCourse.id);
    try {
      await updateCourse(editingCourse.id, editingCourse, token || "");
      console.log("ManagerCourse: course updated successfully =>", editingCourse.id);
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
      );
      setOpenEditModal(false);
      setSnackbar({
        open: true,
        message: "Course updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("ManagerCourse: Failed to update course =>", error);
      setSnackbar({
        open: true,
        message: "Failed to update course",
        severity: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`ManagerCourse: handleInputChange => name=${name}, value=${value}`);
    setEditingCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  // Xử lý cập nhật thông tin của section và content trong course
  const handleSectionChange = (sectionIndex, field, value) => {
    console.log(`ManagerCourse: handleSectionChange => sectionIndex=${sectionIndex}, field=${field}, value=${value}`);
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        [field]: value,
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleContentChange = (sectionIndex, contentIndex, field, value) => {
    console.log(
      `ManagerCourse: handleContentChange => sectionIndex=${sectionIndex}, contentIndex=${contentIndex}, field=${field}, value=${value}`
    );
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      const section = newSections[sectionIndex] || {};
      const newContents = [...(section.contents || [])];
      newContents[contentIndex] = {
        ...newContents[contentIndex],
        [field]: value,
      };
      section.contents = newContents;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };

  const handleAddSection = () => {
    console.log("ManagerCourse: handleAddSection");
    setEditingCourse((prev) => {
      if (!prev) return prev;
      const newSections = prev.sections ? [...prev.sections] : [];
      newSections.push({
        title: "",
        description: "",
        video_url: "",
        is_free: false,
        contents: [],
      });
      return { ...prev, sections: newSections };
    });
  };

  const handleRemoveSection = (sectionIndex) => {
    console.log("ManagerCourse: handleRemoveSection => sectionIndex=", sectionIndex);
    setEditingCourse((prev) => {
      if (!prev) return prev;
      const newSections = [...(prev.sections || [])];
      if (newSections[sectionIndex].id) {
        newSections[sectionIndex].is_deleted = true;
        console.log("Marked existing section as is_deleted:", newSections[sectionIndex].id);
      } else {
        newSections.splice(sectionIndex, 1);
        console.log("Removed newly created section at index:", sectionIndex);
      }
      return { ...prev, sections: newSections };
    });
  };

  const handleAddContent = (sectionIndex) => {
    console.log("ManagerCourse: handleAddContent => sectionIndex=", sectionIndex);
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      const section = newSections[sectionIndex] || {};
      const newContents = section.contents ? [...section.contents] : [];
      newContents.push({
        title: "",
        content_type: "",
        content_url: "",
        description: "",
      });
      section.contents = newContents;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };

  const handleRemoveContent = (sectionIndex, contentIndex) => {
    console.log(
      `ManagerCourse: handleRemoveContent => sectionIndex=${sectionIndex}, contentIndex=${contentIndex}`
    );
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      const section = newSections[sectionIndex] || {};
      if (section.contents && section.contents[contentIndex]) {
        if (section.contents[contentIndex].id) {
          section.contents[contentIndex].is_deleted = true;
          console.log("Marked existing content as is_deleted:", section.contents[contentIndex].id);
        } else {
          section.contents.splice(contentIndex, 1);
          console.log("Removed newly created content at index:", contentIndex);
        }
      }
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };

  const handleDeleteCourse = async (courseId) => {
    console.log("ManagerCourse: handleDeleteCourse => courseId=", courseId);
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) {
      console.log("ManagerCourse: delete course canceled");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await deleteCourse(courseId, token || "");
      console.log("ManagerCourse: course deleted =>", courseId);
      setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));
      setSnackbar({ open: true, message: "Course deleted successfully", severity: "success" });
    } catch (error) {
      console.error("ManagerCourse: failed to delete course =>", error);
      setSnackbar({ open: true, message: "Failed to delete course", severity: "error" });
    }
  };

  if (loading) {
    console.log("ManagerCourse: loading data...");
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <CourseTable
            courses={courses}
            instructors={instructors}
            categories={categories}
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        </Card>
      </SoftBox>

      <EditCourseModal
        open={openEditModal}
        onClose={() => {
          console.log("ManagerCourse: closing EditCourseModal");
          setOpenEditModal(false);
        }}
        course={editingCourse}
        categories={categories}
        onInputChange={handleInputChange}
        onSectionChange={handleSectionChange}
        onContentChange={handleContentChange}
        onAddSection={handleAddSection}
        onRemoveSection={handleRemoveSection}
        onAddContent={handleAddContent}
        onRemoveContent={handleRemoveContent}
        onSave={handleSaveCourse}
      />

      <FeedbackAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => {
          console.log("ManagerCourse: closing snackbar");
          setSnackbar({ ...snackbar, open: false });
        }}
      />

      <AddCategory />
      <AddCourse />
      <Footer />
    </DashboardLayout>
  );
}

export default ManagerCourse;
