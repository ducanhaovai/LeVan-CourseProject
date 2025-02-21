  import React, { useState, useEffect, useRef } from "react";
  import { Zap } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import anh1 from "../../../../assets/images/Homepage/banner-1.png";
  import { useTranslation } from 'react-i18next';
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

  export function CountUp() {
    const { t } = useTranslation(); 
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
      { value: 45, label: t('homepage.header-landing.lectures') },  
      { value: 20500, label: t('homepage.header-landing.students') },
      { value: 24, label: t('homepage.header-landing.learningHours') },
      { value: 563000, label: t('homepage.header-landing.totalLearningHours') },
    ];

    return (
      <div ref={statsRef} className="pt-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
    );
  }

  export default function HeaderLanding() {
    const navigate = useNavigate();
    const { t } = useTranslation(); 
    return (
      <div className="px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#FFF5F5] rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-[#FF7235]" />
                <span className="text-sm">{t('homepage.header-landing.greeting')}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#14142B]">
                {t('homepage.header-landing.title-c')} <span className="text-[#FF7235]"> {t('homepage.header-landing.title-i')}</span> {t('homepage.header-landing.title-a')}
                  <br className="hidden md:block" />
                  {t('homepage.header-landing.title')}
                </h1>
                <p className="text-[#4E4B66] text-base md:text-lg">
                {t('homepage.header-landing.intro')}
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate("/course")}
                    className="bg-[#14142B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#14142B]/90 transition-colors inline-flex items-center justify-center"
                  >
                   {t('homepage.header-landing.exploreNow')} <span className="ml-2">→</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 justify-center">
  <CountUp/>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-square relative">
                <img
                  src={anh1}
                  alt="UpSkill Learning"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
