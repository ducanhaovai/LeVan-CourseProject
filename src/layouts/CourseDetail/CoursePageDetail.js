import React, { useState, useEffect } from "react";
import CourseHeader from "./components/CourseHeader";

import CourseSidebar from "./components/CourseSidebar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useParams } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CommentForm from "./components/Comment";
import { fetchCourseBySlug, fetchUsersByID } from "api/apiAdmin";
import { checkEnrollmentStatus } from "api/apiEnrollments";
import { fetchCategoriesByID } from "api/apiAdmin";
import PageLearn from "./components/PageLearn";
import PageDesReq from "./components/pageDesRe";
import CourseContent from "./components/CourseContent";
import Instructor from "./components/Instructor/PageInstructor";
import Footer from "examples/Footer";
import Reviews from "./components/Review";

const CoursePageDetail = () => {
  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [category, setCategory] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const courseResponse = await fetchCourseBySlug(slug, token);

        const courseData = courseResponse.data.data;

        if (!courseData || !courseData.instructor_id) {
          throw new Error("Instructor ID is missing in course data.");
        }

        const instructorResponse = await fetchUsersByID(courseData.instructor_id, token);

        const instructorData = instructorResponse.data;
        const categoryResponse = await fetchCategoriesByID(courseData.category_id, token || "");
        const categoryData = categoryResponse.data;

        setCategory(categoryData.category.name);
        setCourse(courseData);
        setInstructor(instructorData);

        const enrollmentResponse = await checkEnrollmentStatus(courseData.id, token);
        setEnrollmentStatus(enrollmentResponse?.enrollmentStatus || "not_enrolled");

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to fetch course details: " + error.message);
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [slug, token]);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!course) return <div>No course data available</div>;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="border-b-2 border-gray-200 pb-5 ">
                <CourseHeader course={course} user={instructor} category={category} />
              </div>
              <div className="border-b-2 border-gray-200 pb-5 ">
                <PageLearn />
              </div>
              <div className="border-b-2 border-gray-200 pb-5 ">
                <PageDesReq />
              </div>
              <div className="border-b-2 border-gray-200 pb-5 ">
                <CourseContent course={course} enrollmentStatus={enrollmentStatus} />
              </div>
              <div className="border-b-2 border-gray-200 pb-5">
                <Instructor />
              </div>
              <div className="border-b-2 border-gray-200 pb-5">
                <Reviews />
              </div>
              <CommentForm />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="col-span-12 md:col-span-4">
              <CourseSidebar
                currentUser={currentUser}
                course={course}
                enrollmentStatus={enrollmentStatus}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </DashboardLayout>
  );
};

export default CoursePageDetail;
