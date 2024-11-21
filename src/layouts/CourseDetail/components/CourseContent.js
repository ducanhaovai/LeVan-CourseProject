import { CheckCircle2, ChevronDown, ChevronUp, FileText, PlayCircle } from "lucide-react";
import { useState } from "react";

const CourseContent = ({ course, enrollmentStatus }) => {
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
      <h2 className="text-xl font-medium mb-6">Course Content</h2>
      {course.sections.map((section) => (
        <div key={section.id} className="mb-4 border border-gray-200 rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4"
            onClick={() => toggleSection(section.id)}
          >
            <span className="font-medium text-base">{section.title}</span>
            {expandedSections.includes(section.id) ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="p-4 bg-gray-50">
              {section.is_free || enrollmentStatus === "completed" ? (
                <ul className="space-y-2">
                  {section.content.map((content, index) => (
                    <li
                      key={`${section.id}-${content.content_id}-${index}`}
                      className="flex items-center"
                    >
                      {content.content_type === "document" && (
                        <a href={content.content_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        </a>
                      )}
                      {content.content_type === "video" && (
                        <a href={content.content_url} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="h-4 w-4 text-gray-400 mr-2" />
                        </a>
                      )}
                      {content.content_type === "quiz" && (
                        <a href={content.content_url} target="_blank" rel="noopener noreferrer">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2" />
                        </a>
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{content.title}</p>
                        <p className="text-xs text-gray-500">{content.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
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

export default CourseContent;
