import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "layouts/CourseStudent/components/CourseCard";

import { fetchUsers } from "api/apiAdmin";
import { fetchCourses } from "api/apiAdmin";
import { fetchCategories } from "api/apiAdmin";

export default function CourseUser() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
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

  if (loading) {
    return <p className="text-center text-[#4E4B66]">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Your <span className="text-[#FF7235]">Enrolled Courses</span>
          </h2>
          <p className="text-[#4E4B66]">
            {courses.length === 0
              ? "Start learning by enrolling in top courses today!"
              : "Your personalized course list based on your enrollment."}
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            <p>No courses enrolled yet.</p>
            <button
              className="mt-4 px-6 py-3 bg-[#FF7235] text-white rounded-lg shadow-md hover:bg-[#e3622f] transition"
              onClick={() => (window.location.href = "/courses")}
            >
              Enroll Now
            </button>
          </div>
        ) : (
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex content-center justify-center md:flex-row">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
