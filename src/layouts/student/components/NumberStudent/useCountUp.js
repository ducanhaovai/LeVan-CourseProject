import anh1 from "../../../../assets/images/home-decor-2.jpg";
import { Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    <div className="container mx-auto ">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#FFF5F5] rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-[#FF7235]" />
            <span className="text-sm">Your Instructor</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#14142B] leading-tight">
              Hi, Im Ali Tufan,
              <br />
              I Will Be Taking You Through
              <br />
              Lessons.
            </h1>
            <p className="text-[#4E4B66] text-lg">
              Create beautiful website with this UpSkill UI template. Get started building a site
              today.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-medium text-[#14142B]">
                  {useCountUp(stat.value, 2000, isVisible)}
                  {stat.value > 1000 ? "+" : ""}
                </div>
                <div className="text-[#4E4B66] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative">
          <div className="relative w-full aspect-square">
            <img src={anh1} alt="Students learning" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
