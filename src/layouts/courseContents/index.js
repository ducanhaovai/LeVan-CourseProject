"use client";
import { useState, useEffect } from "react";
import { Button } from "./components/button";
import { Progress } from "./components/progress";
import { ScrollArea } from "./components/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/accordion";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseBySlug } from "../../api/apiAdmin";
import { checkEnrollmentStatus } from "../../api/apiEnrollments";
import ReactPlayer from "react-player";
import usePrevent from "hook/PreventHandler";
const API_URL = process.env.REACT_APP_URL;
export default function CourseContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [courseData, setCourseData] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  const { slug } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function checkEnrollment() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. User is not authenticated.");
        setError("User is not authenticated");
        setLoading(false);
        navigate("/login");
        return;
      }
      try {
        const enrollmentResponse = await checkEnrollmentStatus(slug, token);
        console.log("Enrollment response:", enrollmentResponse);
        setEnrollmentStatus(enrollmentResponse.enrollmentStatus);
        if (enrollmentResponse.enrollmentStatus !== "done") {
          alert("Bạn chưa đăng ký khóa học này hoặc đang chờ xác minh. Vui lòng đăng ký hoặc chờ xác minh.");
          navigate(`/enroll/${slug}`);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
        setError("Failed to check enrollment status");
        navigate(`/enroll/${slug}`);
      }
    }
    checkEnrollment();
  }, [slug, navigate]);

  // Fetch course data (chỉ chạy khi slug thay đổi)
  useEffect(() => {
    async function fetchCourseData() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found when fetching course data.");
        setError("User is not authenticated");
        setLoading(false);
        return;
      }
      try {
        const courseResponse = await fetchCourseBySlug(slug, token);
        console.log("Fetched course response:", courseResponse);
        setCourseData(courseResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Failed to load course data");
        setLoading(false);
      }
    }
    fetchCourseData();
  }, [slug]);

  // Log courseData mỗi khi thay đổi
  useEffect(() => {
    console.log("Course data updated:", courseData);
  }, [courseData]);

  usePrevent();
  console.count("Render count");

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">Error: {error}</div>;
  if (!courseData) return <div className="text-center mt-8">No course data available</div>;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="flex flex-col h-screen bg-white text-gray-800">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-xl font-bold mb-2 md:mb-0">
              {courseData.title || "Course Title"}
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50"
              >
                <FileText className="mr-2 h-4 w-4" />
                Notes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Resources
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? "md:w-80" : "w-0"
            } bg-muted flex-shrink-0 border-r overflow-hidden transition-all duration-300 ease-in-out absolute md:relative z-10 h-[calc(100vh-64px)] bg-white`}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Course content</h2>
              </div>
              <p className="text-sm text-gray-600">
                {Array.isArray(courseData.sections) ? courseData.sections.length : 0} sections •{" "}
                {Array.isArray(courseData.sections)
                  ? courseData.sections.reduce(
                      (acc, section) =>
                        acc + (Array.isArray(section.content) ? section.content.length : 0),
                      0
                    )
                  : 0}{" "}
                lectures
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <Accordion type="single" collapsible className="w-full">
                {courseData.sections.map((section) => (
                  <AccordionItem value={`section-${section.id}`} key={section.id}>
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:bg-gray-100">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {Array.isArray(section.content) ? (
                        section.content.map((content) => (
                          <div
                            key={content.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              console.log("Setting current lecture:", content);
                              setCurrentLecture(content);
                            }}
                          >
                            {content.content_type === "video" ? (
                              <PlayCircle className="h-4 w-4 text-gray-400 mr-2" />
                            ) : content.content_type === "document" ? (
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{content.title}</p>
                              <p className="text-xs text-gray-500">{content.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No content available</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </aside>

          <main
            className={`flex-1 overflow-y-auto p-4 ${isSidebarOpen ? "" : "ml-0"} transition-margin duration-300`}
          >
            <div className="aspect-video mb-4 rounded-lg flex items-center justify-center text-white">
              {courseData.sections && currentLecture?.content_type === "video" && (
                <ReactPlayer
                  url={currentLecture.content_url}
                  title="Lecture Content"
                  controls={true}
                  playing={true}
                  width="100%"
                  height="100%"
                />
              )}
            {currentLecture?.content_type === "document" && (
  <iframe
    src={`${API_URL}/${currentLecture.content_url.replace(/\\/g, "/")}#toolbar=0`}
    width="100%"
    height="600px"
    allow="fullscreen"
    style={{ border: "none" }}
  />
)}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {currentLecture?.title || "Lecture Title"}
              </h2>
              <p className="text-gray-600">
                {currentLecture?.description || "Lecture description goes here."}
              </p>
            </div>
          </main>
        </div>

        <footer className="border-t border-gray-200 p-4 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-gray-600 hover:text-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={22} className="w-48" />
            <p className="text-sm text-gray-600">
              2 of{" "}
              {courseData.sections.reduce(
                (acc, section) => acc + (section.content.length || 0),
                0
              )}{" "}
              complete
            </p>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
