import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, GraduationCap, BookOpen, Users } from "lucide-react";
import anh1 from "../../../assets/images/Homepage/whychose1.jpg"
import anh2 from "../../../assets/images/Homepage/whychose2.jpg"
import anh3 from "../../../assets/images/Homepage/whychose3.jpg"
import anh4 from "../../../assets/images/Homepage/whychose4.jpg"

export default function CourseSearch() {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      {/* Search Section */}
      {/* <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">{t('homepage.courseSearch.searchCourses')}</h1>
        <div className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('homepage.courseSearch.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button className="px-6 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors">
            {t('homepage.courseSearch.searchButton')}
          </button>
        </div>
      </div> */}

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image Grid */}
        <div className="relative">
          <div className="aspect-square rounded-[2rem] border-4 border-dashed border-purple-200 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-pink-300 rounded-2xl overflow-hidden">
                <img
                  src={anh1}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-purple-400 rounded-2xl overflow-hidden">
                <img
                  src={anh2}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-purple-400 rounded-2xl overflow-hidden">
                <img
                  src={anh3}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-pink-300 rounded-2xl overflow-hidden">
                <img
                  src={anh4}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-semibold">
            <span className="text-purple-400">{t('homepage.courseSearch.whyChooseUs')}</span>
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('homepage.courseSearch.masterModernTech')}</h3>
                <p className="text-gray-600">
                  {t('homepage.courseSearch.masterModernTechDesc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 bg-pink-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('homepage.courseSearch.realLearning')}</h3>
                <p className="text-gray-600">
                  {t('homepage.courseSearch.realLearningDesc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('homepage.courseSearch.dedicatedSupport')}</h3>
                <p className="text-gray-600">
                  {t('homepage.courseSearch.dedicatedSupportDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
