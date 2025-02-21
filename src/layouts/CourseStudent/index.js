"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CourseCard from "./components/CourseCard";
import { fetchCourses, fetchUsers, fetchCategories } from "../../api/apiAdmin";

export default function CourseListing() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    instructor: [],
    price: [],
    review: [],
    level: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
        const courseData = courseResponse.data;
        const categoryData = categoriesResponse.data.categories;

        setInstructors(allUsers.filter((user) => user.role === 2));
        setCourses(courseData);
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(course.category_id);
    const matchesInstructor =
      filters.instructor.length === 0 || filters.instructor.includes(course.instructor_id);
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isActive = course.status === 1;

    return matchesCategory && matchesInstructor && matchesSearch && isActive;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
        <Footer />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">{error}</h1>
        </div>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <p className="text-base">
            Showing {indexOfFirstItem + 1}-
            {indexOfLastItem > filteredCourses.length ? filteredCourses.length : indexOfLastItem} of{" "}
            {filteredCourses.length} Results
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}
