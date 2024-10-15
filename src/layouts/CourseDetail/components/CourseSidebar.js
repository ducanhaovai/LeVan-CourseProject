const CourseSidebar = () => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden sticky top-4">
    <img
      src="/placeholder.svg?height=200&width=400"
      alt="Course preview"
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl font-bold text-gray-900">$49.0</span>
        <span className="text-lg font-medium text-gray-500 line-through">$89.0</span>
      </div>
      <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Enroll Now
      </button>
      <div className="mt-4 text-center text-sm text-gray-500">30-Day Money-Back Guarantee</div>
    </div>
  </div>
);

export default CourseSidebar;
