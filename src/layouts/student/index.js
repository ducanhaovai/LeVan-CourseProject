import "../student/css/banner.css";
import "../student/css/category.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Zap, Play } from "lucide-react";
import { useState } from "react";
import NumberStudent from "./components/NumberStudent/NumberStudent";

import HeaderLanding from "./components/Header/HeaderLanding";
import Benefits from "./components/Benefits";
import TrendingCategories from "./components/Category";
import CourseTop from "./components/CourseTop";
import CourseUser from "./components/CourseUser";
import FaqSection from "./components/FAQ";
import LearningJourney from "./components/LearningJourney";
import SlidePicture from "./components/SlidePictrue";

function Student() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <HeaderLanding />
      <Benefits />
      <CourseUser />
      <CourseTop />
      <SlidePicture/>
      <FaqSection />
      <LearningJourney />
      
      <Footer />
    </DashboardLayout>
  );
}

export default Student;
