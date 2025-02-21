import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import anh1 from "../../../assets/images/faq_img.png";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();

  const faqs = t('faqSection.faqs', { returnObjects: true });

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 flex-col md:flex-row gap-12 flex items-center justify-center">
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        <div className="absolute w-full h-full">
          <img src={anh1} alt="Student" />
        </div>
      </div>
      <div className="flex-1 max-w-xl pt-8">
        <p className="text-purple-600 mb-2">{t('faqSection.title')}</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('faqSection.subtitle')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('faqSection.description')}
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 group cursor-pointer">
              <div
                className="flex items-center justify-between"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {faq.question}
                </h3>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform ${activeIndex === index ? "rotate-90" : ""}`}
                />
              </div>
              {activeIndex === index && (
                <p className="text-gray-500 mt-2 transition-all">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
