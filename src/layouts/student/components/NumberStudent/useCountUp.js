import { Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import anh1 from "../../../../assets/images/home-decor-2.jpg";

function useCountUp(end, duration = 1200, shouldStart) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
}

export default function CountUp() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const stats = [
    { value: 45, label: "Lesson" },
    { value: 20500, label: "Students" },
    { value: 24, label: "Learning Hours" },
    { value: 563000, label: "Learning Hours" },
  ];

  return (
    <div className="pt-10">
      <div  className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-6 lg:space-y-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-xl md:text-2xl lg:text-3xl font-medium text-[#14142B]">
                  {useCountUp(stat.value, 2000, isVisible)}
                  {stat.value > 1000 ? "+" : ""}
                </div>
                <div className="text-[#4E4B66] text-xs md:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
