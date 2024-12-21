/* eslint-disable react/no-unescaped-entities */
import { Users, Laptop, Award, Mail } from "lucide-react";

export default function LearningJourney() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Learn with Experts",
      description: "Curate anding area share Pluralsight content to reach your",
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Learn Anything",
      description: "Curate anding area share Pluralsight content to reach your",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Get Online Certificate",
      description: "Curate anding area share Pluralsight content to reach your",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "E-mail Marketing",
      description: "Curate anding area share Pluralsight content to reach your",
    },
  ];

  return (
    <div className="bg-[#2A2167]  py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <div className="inline-block px-4 py-1 bg-indigo-700 rounded-full text-white mb-6">
          How We Start Journey
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">Start Your Learning Journey Today!</h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Groove's intuitive shared inbox makesteam members together organize, prioritize and.In
          this episode.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              {/* Icon Container with Sparkle Effect */}
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-800/50 rounded-lg flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {feature.icon}
                </div>
                {/* Sparkle */}
                <div className="absolute -right-1 -top-1 w-3 h-3 text-indigo-400">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path
                      d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>

              <p className="text-gray-400 max-w-xs mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
