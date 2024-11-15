import React, { useState, useEffect } from "react";
import CourseHeader from "./components/CourseHeader";
import TabNavigation from "./components/TabNavigation";
import OverviewTab from "./components/OverviewTab";
import CurriculumTab from "./components/CurriculumTab";
import InstructorTab from "./components/InstructorTab";
import FaqTab from "./components/FaqTab";
import ReviewTab from "./components/ReviewTab";
import CourseSidebar from "./components/CourseSidebar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Breadcrumbs from "examples/Breadcrumbs";
import CommentForm from "./components/Comment";
import { fetchCoursesId } from "api/apiAdmin";
import { checkEnrollmentStatus } from "api/apiEnrollments";

const CoursePageDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setCurrentUser(decodedToken);
      }
      try {
        const courseResponse = await fetchCoursesId(id, token);
        const enrollmentResponse = await checkEnrollmentStatus(id, token);

        setCourse(courseResponse.data);
        setEnrollmentStatus(enrollmentResponse?.enrollmentStatus || "not_enrolled");
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to fetch course details: " + error.message);
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, token]);

  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course data available</div>;
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab course={course} />;
      case "curriculum":
        return <CurriculumTab course={course} enrollmentStatus={enrollmentStatus} />;
      case "instructor":
        return <InstructorTab course={course} />;
      case "faqs":
        return <FaqTab />;
      case "reviews":
        return <ReviewTab />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseHeader course={course} />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
          </div>

          <div className="w-full md:w-1/3">
            <CourseSidebar
              currentUser={currentUser}
              course={course}
              enrollmentStatus={enrollmentStatus}
            />
          </div>
        </div>
        <CommentForm />
      </div>
    </DashboardLayout>
  );
};

export default CoursePageDetail;
