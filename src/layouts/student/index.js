import "../student/css/banner.css";
import "../student/css/category.css";
import { Star, ChevronLeft, ChevronRight, BookOpen, Users, Clock } from "lucide-react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Zap, Play } from "lucide-react";
import { useState } from "react";
import NumberStudent from "./components/NumberStudent/NumberStudent";
import CountUp from "./components/NumberStudent/useCountUp";
import HeaderLanding from "./components/Header/HeaderLanding";
const courses = [
  {
    id: 1,
    title: "Become a Certified Web Developer HTML, CSS and JavaScript",
    image: "/placeholder.svg",
    lessons: 11,
    students: 229,
    hours: 16,
    rating: 4.9,
    reviews: 230,
    instructor: "Carolyn Welborn",
    price: 89.29,
  },
  {
    id: 2,
    title: "Figma Prototyping A deep dive for UX/UI Designer",
    image: "/placeholder.svg",
    lessons: 11,
    students: 229,
    hours: 16,
    rating: 4.9,
    reviews: 230,
    instructor: "Carolyn Welborn",
    price: 89.29,
  },
  {
    id: 3,
    title: "Java Swing (GUI) Programming From Beginner to Expert",
    image: "/placeholder.svg",
    lessons: 11,
    students: 229,
    hours: 16,
    rating: 4.9,
    reviews: 230,
    instructor: "Carolyn Welborn",
    price: 89.29,
  },
  {
    id: 4,
    title: "Java Swing (GUI) Programming From Beginner to Expert",
    image: "/placeholder.svg",
    lessons: 11,
    students: 229,
    hours: 16,
    rating: 4.9,
    reviews: 230,
    instructor: "Carolyn Welborn",
    price: 89.29,
  },
];
const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 7L15 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "World Class Teachers",
    description: "What should be the structure of an effective websites and designs.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Global Community",
    description: "What should be the structure of an effective websites and designs.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M22 10V15C22 17.8284 22 19.2426 21.1213 20.1213C20.2426 21 18.8284 21 16 21H8C5.17157 21 3.75736 21 2.87868 20.1213C2 19.2426 2 17.8284 2 15V9C2 6.17157 2 4.75736 2.87868 3.87868C3.75736 3 5.17157 3 8 3H13"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12L9.5 15.5L18 7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Top Notch Courses",
    description: "What should be the structure of an effective websites and designs.",
  },
];
function Student() {
  const [activeTab, setActiveTab] = useState("Popular Courses");

  const tabs = ["Popular Courses", "New Courses", "Trending Courses", "Best Seller"];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <HeaderLanding />
      <div>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-[#FF7235]">Why</span>
            <span className="text-[#14142B]"> Study With Us?</span>
          </h2>
          <p className="text-[#4E4B66] mb-12">Become a valuable expert with UpSkill.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF5F5] text-[#FF7235] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-[#14142B] text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-[#4E4B66]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              The World is Top <span className="text-[#FF7235]">Courses</span>
            </h2>
            <p className="text-[#4E4B66]">
              Online video courses with new additions published every month.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-[#FF7235] text-[#FF7235]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Course Grid */}
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.hours}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="font-medium">{course.rating}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-[#FF7235] text-[#FF7235]" />
                        ))}
                      </div>
                      <span className="text-gray-500">({course.reviews})</span>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">By: {course.instructor}</div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#FF7235] font-bold">${course.price}</span>
                      <button className="text-sm font-medium text-[#14142B] hover:text-[#FF7235]">
                        Enroll Course →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4, 5].map((dot) => (
              <button
                key={dot}
                className={`w-2 h-2 rounded-full ${dot === 1 ? "bg-[#FF7235]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <CountUp />
      </div>

      <Footer />
    </DashboardLayout>
  );
}

export default Student;
