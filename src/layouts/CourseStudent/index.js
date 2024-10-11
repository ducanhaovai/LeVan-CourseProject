import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CourseCard from "./components/CourseCard";
import { fetchCourses, fetchUsers, fetchCategories } from "../../api/apiAdmin";

const FilterOption = ({ title, options, selectedOptions, onChange }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((option) => (
      <div key={option} className="flex items-center mb-1">
        <input
          type="checkbox"
          id={option}
          checked={selectedOptions.includes(option)}
          onChange={() => onChange(option)}
          className="mr-2"
        />
        <label htmlFor={option} className="text-sm text-gray-700">
          {option}
        </label>
      </div>
    ))}
  </div>
);

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

  const handleFilterChange = (filterType, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(option)
        ? prevFilters[filterType].filter((item) => item !== option)
        : [...prevFilters[filterType], option],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(course.category_id);
    const matchesInstructor =
      filters.instructor.length === 0 || filters.instructor.includes(course.instructor_id);

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesInstructor && matchesSearch;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{error}</h1>
        </div>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for courses..."
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 pr-8 mb-8 md:mb-0">
            <FilterOption
              title="Course Category"
              options={categories.map((category) => category.name)}
              selectedOptions={filters.category}
              onChange={(option) => handleFilterChange("category", option)}
            />
            <FilterOption
              title="Instructors"
              options={instructors.map((instructor) => instructor.username)}
              selectedOptions={filters.instructor}
              onChange={(option) => handleFilterChange("instructor", option)}
            />
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}
