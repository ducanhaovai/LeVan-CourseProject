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

  // State cho slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

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

  // Cập nhật số lượng thẻ mỗi slide dựa trên kích thước màn hình
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Nhóm các khóa học thành từng slide
  const slides = [];
  for (let i = 0; i < courses.length; i += cardsPerSlide) {
    slides.push(courses.slice(i, i + cardsPerSlide));
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (loading) {
    return <p className="text-center text-[#4E4B66]">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Nếu chưa có khóa học nào được đăng ký, giữ nguyên cấu trúc ban đầu
  if (courses.length === 0) {
    return (
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Your <span className="text-[#FF7235]">Enrolled Courses</span>
            </h2>
            <p className="text-[#4E4B66]">
              Start learning by enrolling in top courses today!
            </p>
          </div>
          <div className="text-center text-gray-600 text-lg">
            <p>No courses enrolled yet.</p>
            <button
              className="mt-4 px-6 py-3 bg-[#FF7235] text-white rounded-lg shadow-md hover:bg-[#e3622f] transition"
              onClick={() => (window.location.href = "/courses")}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Your <span className="text-[#FF7235]">Enrolled Courses</span>
          </h2>
          <p className="text-[#4E4B66]">
            Your personalized course list based on your enrollment.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {slide.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
