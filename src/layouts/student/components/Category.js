import { ArrowLeft, ArrowRight, Users, Layout, PenTool, PieChart, Code, Mail } from "lucide-react";
import { useRef } from "react";

export default function TrendingCategories() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categories = [
    { icon: <Users className="w-6 h-6" />, name: "Management", count: 19 },
    { icon: <Layout className="w-6 h-6" />, name: "App Design", count: 18 },
    { icon: <PenTool className="w-6 h-6" />, name: "Graphic Design", count: 22 },
    { icon: <PieChart className="w-6 h-6" />, name: "Finance", count: 41 },
    { icon: <Code className="w-6 h-6" />, name: "Development", count: 29 },
    { icon: <Mail className="w-6 h-6" />, name: "Marketing", count: 31 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-purple-600 font-medium mb-2">Trending Categories</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Category We Have</h2>
        <p className="text-gray-500">when known printer took a galley of type scrambl edmake</p>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-amber-400 rounded-full p-2 shadow-lg hover:bg-amber-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar flex gap-6 px-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0 w-[160px]">
              <div className="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <div className="text-purple-600">{category.icon}</div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
              <p className="text-gray-500">({category.count})</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-amber-400 rounded-full p-2 shadow-lg hover:bg-amber-500 transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
