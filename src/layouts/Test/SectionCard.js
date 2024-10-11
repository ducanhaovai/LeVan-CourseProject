import React from "react";
import { Link } from "react-router-dom";

function SectionCard({ section, courseId, isAccessible }) {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h3 className="text-lg font-bold">{section.title}</h3>
      <p className="text-gray-600">{section.description}</p>
      {isAccessible ? (
        <Link
          to={`/courses/${courseId}/sections/${section.id}`}
          className="text-blue-500 hover:underline"
        >
          View Section
        </Link>
      ) : (
        <p className="text-red-500">This section is paid content. Please enroll to view.</p>
      )}
    </div>
  );
}

export default SectionCard;
