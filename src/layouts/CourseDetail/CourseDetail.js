import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTubePlayer from "./YouTubePlayer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { ChevronDown, ChevronUp, Star, User } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course data available</div>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      {course.sections &&
        course.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-600 mb-4">{section.description}</p>

            {section.is_free ? (
              <>
                <YouTubePlayer videoId={section.video_url} />
                <div className="ml-4">
                  {section.contents &&
                    section.contents.map((content) => (
                      <div key={content.content_id} className="mb-4">
                        <h3 className="text-xl font-medium">{content.title}</h3>
                        <p className="text-gray-600">{content.description}</p>
                        {content.content_type === "video" && (
                          <YouTubePlayer videoId={content.content_url} />
                        )}
                        {content.content_type === "document" && (
                          <a
                            href={content.content_url}
                            className="text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        )}
                        {content.content_type === "quiz" && (
                          <a
                            href={content.content_url}
                            className="text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Start Quiz
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-200 p-4 text-center">
                <p className="text-lg font-bold">
                  This section is only available for premium users.
                </p>
              </div>
            )}
          </div>
        ))}

      <p className="text-gray-600">Price: ${course.price}</p>
      <p className="text-gray-600">Duration: {course.duration} hours</p>
      <p className="text-gray-600">Total Enrollments: {course.total_enrollments}</p>
      <p className="text-gray-600">Rating: {course.rating}</p>
    </DashboardLayout>
  );
}
