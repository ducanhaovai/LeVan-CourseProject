import React from "react";

const CourseDetails = ({ course }) => {
  if (!course) return null;

  return (
    <div className="space-y-8">
      {/* Course Title & Short Description */}
      <section>
      <h3 className="text-2xl font-semibold mb-2">Description</h3>

        <p className="text-lg text-gray-700">{course.description}</p>
      </section>

      {/* Detailed Description */}
      <section>
        <h3 className="text-2xl font-semibold mb-2">About This Course</h3>
        <p className="text-gray-700 whitespace-pre-line">{course.detailed_description}</p>
      </section>

      {/* Course Content */}
      <section>
        <h3 className="text-2xl font-semibold mb-2">Course Content</h3>
        <p className="text-gray-700 whitespace-pre-line">{course.course_content}</p>
      </section>

      {/* Course Features */}
      <section>
        <h3 className="text-2xl font-semibold mb-2">Course Features</h3>
        <p className="text-gray-700 whitespace-pre-line">{course.course_features}</p>
      </section>

      {/* Pricing & Materials Info */}
      <section>
        <h3 className="text-2xl font-semibold mb-2">Pricing & Materials Info</h3>
        <p className="text-gray-700 whitespace-pre-line">{course.pricing_info}</p>
      </section>

      {/* Requirements */}
      <section>
        <h3 className="text-2xl font-semibold mb-2">Requirements</h3>
        <p className="text-gray-700 whitespace-pre-line">{course.requirements}</p>
      </section>
    </div>
  );
};

export default CourseDetails;
