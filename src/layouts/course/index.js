// Trong ManagerCourse.js

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

import CourseTable from './components/CourseTable';
import EditCourseModal from './components/EditCourseModal';
import FeedbackAlert from './components/FeedbackAlert';
import LoadingScreen from './components/LoadingScreen';
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
      setLoading(true);
      try {
        const [userResponse, courseResponse, categoriesResponse] = await Promise.all([
          fetchUsers(token || ""),
          fetchCourses(token || ""),
          fetchCategories(token || ""),
        ]);

        const allUsers = userResponse.data.users;
        setUsers(allUsers);
        setInstructors(allUsers.filter((user) => user.role === 2));
        setCourses(courseResponse.data);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to fetch data", severity: "error" });
      } finally {
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
        prevCourses.map((course) =>
          course.id === editingCourse.id ? editingCourse : course
        )
      );
      setOpenEditModal(false);
      setSnackbar({
        open: true,
        message: "Course updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update course",
        severity: "error",
      });
      console.error("Error updating course:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  // Định nghĩa hàm xử lý cho sections và contents:
  const handleSectionChange = (sectionIndex, field, value) => {
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
    setEditingCourse((prev) => {
      if (!prev) return prev;
      const newSections = prev.sections ? [...prev.sections] : [];

      const newOrder =
        newSections.length > 0
          ? Number(newSections[newSections.length - 1].order) + 1
          : 1;
      newSections.push({
        title: "",
        description: "",
        video_url: "",
        is_free: false,
        order: newOrder, // Giá trị này được lưu vào DB nhưng không cần hiển thị trên UI
        contents: [],
      });
      return { ...prev, sections: newSections };
    });
    console.log("Section added");
  };

  const handleRemoveSection = (sectionIndex) => {
    setEditingCourse((prev) => {
      if (!prev) return prev;
      const newSections = [...(prev.sections || [])];
      // Nếu section đã được lưu (có id), chỉ đánh dấu là đã xóa
      if (newSections[sectionIndex].id) {
        newSections[sectionIndex].is_deleted = true;
      } else {
        // Nếu chưa lưu, có thể loại bỏ khỏi state
        newSections.splice(sectionIndex, 1);
      }
      return { ...prev, sections: newSections };
    });
  };

  const handleAddContent = (sectionIndex) => {
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      const section = newSections[sectionIndex] || {};
      const newContents = section.contents ? [...section.contents] : [];
      // Tự động tăng order_index cho content mới
      const newOrderIndex =
        newContents.length > 0
          ? Number(newContents[newContents.length - 1].order_index) + 1
          : 1;
      newContents.push({
        title: "",
        content_type: "",
        content_url: "",
        description: "",
        order_index: newOrderIndex, // Chỉ lưu vào DB, không hiển thị
      });
      section.contents = newContents;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };
  
  const handleRemoveContent = (sectionIndex, contentIndex) => {
    setEditingCourse((prev) => {
      const newSections = [...(prev.sections || [])];
      const section = newSections[sectionIndex] || {};
      if (section.contents && section.contents[contentIndex]) {
        if (section.contents[contentIndex].id) {
          section.contents[contentIndex].is_deleted = true;
        } else {
          section.contents.splice(contentIndex, 1);
        }
      }
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <Typography variant="h6">Course Management</Typography>
            <SoftBox display="flex" gap={2} py={2}>
              <Button onClick={() => setOpenAddCategory(true)}>Add Category</Button>
              <Button onClick={() => setOpenAddCourse(true)}>Add Course</Button>
            </SoftBox>
          </SoftBox>
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
        onClose={() => setOpenEditModal(false)}
        course={editingCourse}
        categories={categories}
        onInputChange={handleInputChange}
        onSectionChange={handleSectionChange}   // truyền hàm cập nhật section
        onContentChange={handleContentChange}     // truyền hàm cập nhật content
        onAddSection={handleAddSection}           // truyền hàm thêm section
        onRemoveSection={handleRemoveSection}     // truyền hàm xóa section
        onAddContent={handleAddContent}           // truyền hàm thêm content
        onRemoveContent={handleRemoveContent}     // truyền hàm xóa content
        onSave={handleSaveCourse}
      />

      <FeedbackAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <AddCategory />
      <AddCourse />
      <Footer />
    </DashboardLayout>
  );
}

export default ManagerCourse;
