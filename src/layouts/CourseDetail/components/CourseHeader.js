const CourseHeader = ({ course }) => {
  return (
    <header className="bg-gray-900 text-white py-8 px-4 rounded-lg mb-8">
      <div>
        {course.category_name} Được dạy bởi {course.instructor_first_name}{" "}
        {course.instructor_last_name}
      </div>
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {course.duration} Hours
        </span>
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>{" "}
          {course.total_enrollments} Students
        </span>
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          {course.total_sections} Section
        </span>
      </div>
    </header>
  );
};

export default CourseHeader;
