import { enrollCourse } from "api/apiEnrollments";
import React from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode }from "jwt-decode";
import {
  Play,
  Clock,
  FileText,
  Download,
  Tv,
  Infinity,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { TiktokIcon } from "./Instructor/SocialButton";

const CourseSidebar = ({ course, enrollmentStatus }) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    try {
      if (enrollmentStatus) {
      
        if (enrollmentStatus === "pending" || enrollmentStatus === "completed") {
          alert("Vui lòng đợi xác minh thanh toán");
          return;
        }
        if (enrollmentStatus === "done") {
          navigate(`/learn/${course.slug}`);
          return;
        }
      }


      const decodedToken = jwtDecode(token);
      const enrollmentData = await enrollCourse(decodedToken.id, course.id);
      if (enrollmentData) {
        navigate(`/checkout/${course.slug}`);
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
        <img
          src={course.thumbnail}
          alt="Course preview"
          className="object-cover rounded-t-xl"
        />
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                ${course.price}
              </span>
              <span className="text-xl line-through text-muted-foreground">
                $89.0
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-[#FFF2F0] text-[#FF4D4F]"
            >
              39% OFF
            </Badge>
          </div>

          {/* Nếu enrollmentStatus là "done", hiển thị Learn Now; ngược lại, hiển thị Enroll Now */}
          {enrollmentStatus === "done" ? (
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

        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Khóa học này cung cấp</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <Download className="w-5 h-5 text-muted-foreground" />
              Có thể tải các dữ liệu đã cung cấp
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Tv className="w-5 h-5 text-muted-foreground" />
              Có thể truy cập bất cứ lúc nào
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Infinity className="w-5 h-5 text-muted-foreground" />
              Hỗ trợ 24/7 và thực hành thực tế
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Award className="w-5 h-5 text-muted-foreground" />
              Nhận bằng sau khi hoàn thành khóa học
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold">Chi tiết hơn về khóa học</h3>
            <h3 className="font-semibold">hãy liên hệ</h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Facebook className="w-4 h-4"  href="https://www.facebook.com/yumi.ling.9?locale=vi_VN" target="_blank"/>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Instagram className="w-4 h-4" href="https://www.instagram.com/levan.academy_hyper.realistic/" target="_blank"/>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <TiktokIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseSidebar;
