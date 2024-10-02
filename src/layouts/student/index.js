import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import "../student/css/banner.css";
import "../student/css/category.css";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import SoftButton from "components/SoftButton";
import CoverLayout from "./components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import {
  Palette,
  Code,
  MessageCircle,
  Video,
  Camera,
  BarChart2,
  FileText,
  DollarSign,
  Atom,
  Share2,
} from "lucide-react";
import { CourseList, sampleCourses } from "./components/CourseCard";
import Certification from "./components/Certification";
const categories = [
  { icon: Palette, name: "Art & Design", courses: 38 },
  { icon: Code, name: "Development", courses: 38 },
  { icon: MessageCircle, name: "Communication", courses: 38 },
  { icon: Video, name: "Videography", courses: 38 },
  { icon: Camera, name: "Photography", courses: 38 },
  { icon: BarChart2, name: "Marketing", courses: 38 },
  { icon: FileText, name: "Content Writing", courses: 38 },
  { icon: DollarSign, name: "Finance", courses: 38 },
  { icon: Atom, name: "Science", courses: 38 },
  { icon: Share2, name: "Network", courses: 38 },
];
function Student() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Build Skills With Online Course</h1>
            <p className="hero-description">
              We denounce with righteous indignation and dislike men who are so beguiled and
              demoralized that cannot trouble.
            </p>
            <button className="hero-button">Read Comment</button>
          </div>
          <div className="hero-image">
            <img src={curved9} alt="Enthusiastic student" className="image" />
          </div>
        </div>
        <SoftBox mb={3}>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid> */}
          <div className="category-container">
            <div className="category-wrapper">
              <div className="category-header">
                <h2 className="category-title">Categories</h2>
                <p className="category-description">Explore our Popular Categories</p>
                <button className="category-button">All Categories</button>
              </div>
              <div className="category-grid">
                {categories.map((category, index) => (
                  <div key={index} className="category-card">
                    <div className="category-card-content">
                      <div className="category-icon">
                        <category.icon className="icon" />
                      </div>
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-course-count">{category.courses} Courses</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SoftBox>
        <SoftBox>
          <CourseList courses={sampleCourses} />
        </SoftBox>
        <SoftBox>
          <Certification />
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Student;
