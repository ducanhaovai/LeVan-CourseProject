import { useTranslation } from "react-i18next";
import { UserCheck, Target, Award, LifeBuoy, Clock, TrendingUp } from "lucide-react";

function getIcon(name) {
  const icons = {
    UserCheck: <UserCheck className="w-8 h-8" />,
    Target: <Target className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    LifeBuoy: <LifeBuoy className="w-8 h-8" />,
    Clock: <Clock className="w-8 h-8" />,
    TrendingUp: <TrendingUp className="w-8 h-8" />
  };
  return icons[name];
}

export default function LearningJourney() {
  const { t } = useTranslation();
  const features = t("learningJourney.features", { returnObjects: true });

  return (
    <div className="bg-[#2A2167] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1 bg-indigo-700 rounded-full text-white mb-6">
          {t("learningJourney.headerTitle")}
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          {t("learningJourney.subHeader")}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          {t("learningJourney.description")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 bg-indigo-800/50 rounded-lg flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {getIcon(feature.icon)}
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 max-w-xs text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
