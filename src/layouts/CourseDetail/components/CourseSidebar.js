import { enrollCourse } from "api/apiEnrollments";
import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Play,
  Clock,
  FileText,
  Download,
  Tv,
  Infinity,
  Award,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";

const CourseSidebar = ({ course, enrollmentStatus }) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    try {
      const decodedToken = jwtDecode(token);
      const enrollmentData = await enrollCourse(decodedToken.id, course.id);

      if (enrollmentData) {
        navigate(`/checkout?slug=${course.slug}`);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleLearnNow = () => {
    navigate(`/learn/${course.slug}`);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="relative aspect-video">
        <img src={course.thumbnail} alt="Course preview" className="object-cover rounded-t-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-4">
            <Play className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">${course.price}</span>
              <span className="text-xl line-through text-muted-foreground">$89.0</span>
            </div>
            <Badge variant="secondary" className="bg-[#FFF2F0] text-[#FF4D4F]">
              39% OFF
            </Badge>
          </div>

          {enrollmentStatus === "completed" ? (
            <Button
              className="w-full bg-[#1d1b48] hover:bg-[#1d1b48]/90 text-white transition duration-300"
              onClick={handleLearnNow}
            >
              Learn Now →
            </Button>
          ) : (
            <Button
              className="w-full bg-[#1d1b48] hover:bg-[#1d1b48]/90 text-white transition duration-300"
              onClick={handleEnroll}
            >
              Enroll Now →
            </Button>
          )}

          <div className="text-center text-sm text-muted-foreground">
            30-Day Money-Back Guarantee
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">This course includes:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-muted-foreground" />
              54.5 hours on-demand video
            </li>
            <li className="flex items-center gap-3 text-sm">
              <FileText className="w-5 h-5 text-muted-foreground" />3 articles
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Download className="w-5 h-5 text-muted-foreground" />
              249 downloadable resources
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Tv className="w-5 h-5 text-muted-foreground" />
              Access on mobile and TV
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Infinity className="w-5 h-5 text-muted-foreground" />
              Full lifetime access
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Award className="w-5 h-5 text-muted-foreground" />
              Certificate of completion
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold">Share this course</h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Linkedin className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseSidebar;
