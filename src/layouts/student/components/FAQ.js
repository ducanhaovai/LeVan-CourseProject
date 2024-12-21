/* eslint-disable react/no-unescaped-entities */
import { ChevronRight } from "lucide-react";
import anh1 from "../../../assets/images/faq_img.png";
export default function FaqSection() {
  const faqs = [
    {
      question: "What's Skillgrow Want to give you?",
      answer: "We want to provide you with comprehensive education and skills.",
    },
    {
      question: "Why choose us for your education?",
      answer: "We offer expert instruction and personalized learning paths.",
    },
    {
      question: "How We Provide Service For you?",
      answer: "Through interactive online platforms and dedicated support.",
    },
    {
      question: "Are you Affordable For Your Course",
      answer: "We offer competitive pricing and flexible payment options.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10  flex-col md:flex-row  gap-12 flex items-center justify-center">
      {/* Left side - Circular text */}
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {/* Hình ảnh không tròn */}
        <div className="absolute w-full h-full">
          <img src={anh1} alt="User" className=" " />
        </div>

        {/* Text vòng cung */}
        <div className="absolute w-full h-full ">
          <svg viewBox="0 0 220 220" className="w-full h-full">
            {/* Đường dẫn chữ di chuyển lên trên */}
            <path
              id="curve"
              d="M 110,80 m -95,0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0"
              fill="none"
            />
            <text className="text-[6px] font-bold tracking-wide fill-black">
              <textPath href="#curve" startOffset="25%" textAnchor="middle">
                * EDUCATION * SYSTEM * CAN * MAKE * CHANGE *
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Right side - FAQ content */}
      <div className="flex-1 max-w-xl pt-8">
        <p className="text-purple-600 mb-2">Faq's</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Start Learning From World's Pro Instructors
        </h2>
        <p className="text-gray-600 mb-8">
          Groove's intuitive shared inbox makes it easy for team members to organize, prioritize
          and.In this episode.
        </p>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 group cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {faq.question}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
