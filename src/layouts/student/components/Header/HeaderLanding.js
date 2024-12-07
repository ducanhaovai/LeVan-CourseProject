import React from "react";
import { Zap } from "lucide-react";
export default function HeaderLanding() {
  return (
    <div>
      <div className="pb-32">
        <div className="container mx-auto ml-auto animate-fade-in-up mr-auto">
          <div className="flex lg:grid-cols-2 gap-16  items-center justify-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#FFF5F5] rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-[#FF7235]" />
                <span className="text-sm">The Leader in Online Learning</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#14142B] gap-4">
                  Get <span className="text-[#FF7235] font-mono"> 2500+ </span>
                  Best Online
                  <br />
                  Courses From UpSkilll
                </h1>
                <p className="text-[#4E4B66] text-lg leading-relaxed">
                  Start, switch, or advance your career with more than 5,000 courses,
                  <br />
                  Professional Certificates, and degrees from world-class universities and
                  companies.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-[#14142B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#14142B]/90 transition-colors inline-flex items-center">
                  Get Started <span className="ml-2">→</span>
                </button>
                <button className="border-2 border-[#14142B] text-[#14142B] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center">
                  Explore courses <span className="ml-2">→</span>
                </button>
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src="/placeholder.svg"
                        alt={`Student ${i}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-[#FF7235]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#4E4B66]">35k+ happy students</p>
                </div>
              </div>

              <div className="flex items-center gap-4"></div>
            </div>

            {/* Right Column - Decorative Circle */}
            <div className="relative">
              <div className="aspect-square relative max-w-sm">
                <img src="https://upskillnextjs.vercel.app/images/page-title/page-title-home1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}