const InstructorTab = ({ course }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-4">Meet Your Instructor</h2>
    <div className="flex items-start space-x-4">
      <img
        src="/placeholder.svg?height=100&width=100"
        alt="Instructor"
        className="w-24 h-24 rounded-full"
      />
      <div>
        <h3 className="text-xl font-semibold">
          {course.instructor_first_name} {course.instructor_last_name}
        </h3>
        <p className="text-gray-600 mt-2">
          {course.instructor_last_name} is a WordPress expert with over 10 years of experience in
          developing and managing online learning platforms. He has helped hundreds of businesses
          set up successful LMS websites using LearnPress and other WordPress tools.
        </p>
      </div>
    </div>
  </div>
);

export default InstructorTab;
