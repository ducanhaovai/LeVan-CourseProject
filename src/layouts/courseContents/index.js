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
import { useParams } from "react-router-dom";
import { fetchCourseBySlug } from "api/apiAdmin";

export default function CourseContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [courseData, setCourseData] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchCourseData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const courseResponse = await fetchCourseBySlug(slug, token);
        setCourseData(courseResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Failed to load course data");
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [slug]);
  console.count("Render count");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="flex flex-col h-screen bg-white text-gray-800">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-xl font-bold mb-2 md:mb-0">{courseData.title || "Course Title"}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <FileText className="mr-2 h-4 w-4" />
                Notes
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
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
                            onClick={() => setCurrentLecture(content)}
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
            className={`flex-1 overflow-y-auto p-4 ${
              isSidebarOpen ? "" : "ml-0"
            } transition-margin duration-300`}
          >
            <div className="aspect-video bg-black mb-4 rounded-lg flex items-center justify-center text-white">
              {currentLecture?.content_type === "video" && (
                <iframe
                  className="w-full h-full"
                  src={currentLecture.content_url}
                  title="Lecture Content"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
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
            <Button variant="outline" size="icon" className="text-gray-600 hover:text-gray-800">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-gray-600 hover:text-gray-800">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={22} className="w-48" />
            <p className="text-sm text-gray-600">
              2 of{" "}
              {courseData.sections.reduce((acc, section) => acc + (section.content.length || 0), 0)}{" "}
              complete
            </p>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
