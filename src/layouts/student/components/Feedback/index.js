import { Quote } from "lucide-react";

const FeedbackCard = ({ text, name, role }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <Quote className="text-gray-400 mb-4" size={24} />
    <p className="text-gray-600 mb-4">{text}</p>
    <div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </div>
);

export default function StudentFeedback() {
  const feedbacks = [
    {
      text: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      name: "Roe Smith",
      role: "Designer",
    },
    {
      text: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      name: "Roe Smith",
      role: "Designer",
    },
    {
      text: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      name: "Roe Smith",
      role: "Designer",
    },
    {
      text: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      name: "Roe Smith",
      role: "Designer",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">Student Feedbacks</h2>
      <p className="text-gray-600 text-center mb-12">What Students Say About Academy LMS</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} {...feedback} />
        ))}
      </div>
    </div>
  );
}
