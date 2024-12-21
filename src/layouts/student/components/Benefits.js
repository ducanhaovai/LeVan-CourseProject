import { Search, GraduationCap, BookOpen, Users, PlayCircle } from "lucide-react";

export default function CourseSearch() {
  return (
    <div className="p-8">
      {/* Search Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Search Courses</h1>
        <div className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for over 50+ courses"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button className="px-6 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image Grid */}
        <div className="relative">
          <div className="aspect-square rounded-[2rem] border-4 border-dashed border-purple-200 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-pink-300 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-purple-400 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-purple-400 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-pink-300 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">
            <span className="text-purple-400">Benefits</span> From Our Online Learning
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Online Degrees</h3>
                <p className="text-gray-600">
                  Earn accredited degrees from the comfort of your home, opening doors to a world of
                  possibilities.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 bg-pink-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Short Courses</h3>
                <p className="text-gray-600">
                  Enhance your skills with our concise and focused short courses, designed for quick
                  and effective learning.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Training From Experts</h3>
                <p className="text-gray-600">
                  Immerse yourself in knowledge with industry experts guiding you through hands-on
                  experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 bg-pink-100 rounded-lg">
                <PlayCircle className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">1.5k+ Video Courses</h3>
                <p className="text-gray-600">
                  Dive into a vast library of over 1.5k video courses covering many subjects,
                  offering a visual learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
