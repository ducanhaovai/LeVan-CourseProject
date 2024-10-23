const OverviewTab = ({ course }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
    <p className="text-gray-600">{course.description}</p>
    <ul className="mt-4 list-disc list-inside text-gray-600">
      <li>Learn to set up and configure LearnPress</li>
      <li>Create engaging course content and quizzes</li>
      <li>Manage students and track their progress</li>
      <li>Integrate payment gateways for course sales</li>
      <li>Optimize your LMS for better performance</li>
    </ul>
  </div>
);

export default OverviewTab;
