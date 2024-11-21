import SoftAvatar from "components/SoftAvatar";
import "../css/CourseDetail.css";
import SoftTypography from "components/SoftTypography";
import { Star, Users, BookOpen, Clock, Play } from "lucide-react";
import CourseSidebar from "./CourseSidebar";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const CourseHeader = ({ course, user, category }) => {
  if (!course || !user) {
    return null;
  }
  const Star = ({ filled, half }) => {
    if (filled) {
      return (
        <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.515 7.12 7.901.585-6.09 5.367 2.092 8.325-7.418-4.502-7.418 4.502 2.092-8.325L.584 8.292l7.901-.585L12 .587z" />
        </svg>
      );
    } else if (half) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style={{ stopColor: "black", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "grey", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M12 .587l3.515 7.12 7.901.585-6.09 5.367 2.092 8.325-7.418-4.502-7.418 4.502 2.092-8.325L.584 8.292l7.901-.585L12 .587z"
            fill="url(#half-fill)"
          />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-gray-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.515 7.12 7.901.585-6.09 5.367 2.092 8.325-7.418-4.502-7.418 4.502 2.092-8.325L.584 8.292l7.901-.585L12 .587z" />
        </svg>
      );
    }
  };

  const firstNameInitial = user.first_name ? user.first_name[0] : "";
  const lastNameInitial = user.last_name ? user.last_name[0] : "";
  const formattedDate = formatDate(course.last_updated);
  const sectionsCount = Array.isArray(course.sections) ? course.sections.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-8 items-start">
      {/* Left Column */}
      <div className="col-span-7 space-y-4">
        <div className="content">
          <h2 className={`text-2xl md:text-4xl font-bold mb-2 responsive-heading`}>
            {course.title}
          </h2>
          <p className="mb-3 responsive-text">Category: {category || "No Category"}</p>
          <ul className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center">
              <span className="text-sm mr-1">{Number(course.rating).toFixed(1)}</span>
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= Math.floor(course.rating);
                const isHalf =
                  !isFilled && star === Math.ceil(course.rating) && course.rating % 1 >= 0.5;
                return <Star key={star} filled={isFilled} half={isHalf} />;
              })}
              <span className="ml-1 text-sm responsive-text">Rating</span>
            </div>

            {/* Additional Info */}
            <li className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="text-sm responsive-text">Sections: {sectionsCount}</span>
            </li>
            <li className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm responsive-text">Students: {course.total_enrollments}</span>
            </li>
            <li className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm responsive-text">Hours: {course.duration}</span>
            </li>
            <li className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm responsive-text">Last Update: {formattedDate}</span>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground responsive-icon`}
            >
              {user.first_name[0] + (user.last_name ? user.last_name[0] : "")}
            </div>
            <div>
              <div className="font-medium responsive-text">By {user.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
