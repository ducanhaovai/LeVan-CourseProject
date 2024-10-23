import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CurriculumTab = ({ course, enrollmentStatus }) => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  if (!course || !course.sections || course.sections.length === 0) {
    return <div>No course curriculum available</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
      {course.sections.map((section, index) => (
        <div key={section.id} className="mb-4 border border-gray-200 rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleSection(section.id)}
          >
            <span className="font-semibold">{section.title}</span>
            {expandedSections.includes(section.id) ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="p-4 bg-gray-50">
              {/* Allow free sections or check if enrollment is completed */}
              {section.is_free || enrollmentStatus === "completed" ? (
                <ul className="space-y-2">
                  {section.contents.map((content) => (
                    <li key={content.content_id} className="flex items-center">
                      <span className="mr-2">📚</span> {content.title}: {content.description}
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
                    </li>
                  ))}
                </ul>
              ) : (
                // If section is locked and the user doesn't have access
                <div className="bg-gray-200 p-4 text-center">
                  <p className="text-lg font-bold">
                    This section is only available for premium users.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CurriculumTab;
