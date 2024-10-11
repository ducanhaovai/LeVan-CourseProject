import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTubePlayer from "./YouTubePlayer"; // Import component YouTubePlayer để nhúng video YouTube
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function CourseDetail() {
  const { id } = useParams(); // Lấy id từ URL sử dụng useParams của react-router-dom
  const [course, setCourse] = useState(null); // State để lưu trữ thông tin khóa học
  const [error, setError] = useState(null); // State để lưu trữ lỗi khi xảy ra
  const [loading, setLoading] = useState(true); // State để kiểm soát loading
  const token = localStorage.getItem("token"); // Lấy token từ localStorage (nếu có xác thực)

  useEffect(() => {
    // Hàm lấy dữ liệu chi tiết khóa học dựa vào id
    const fetchCourseDetail = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const response = await axios.get(`http://localhost:3001/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm header Authorization nếu cần xác thực
          },
        });

        setCourse(response.data); // Cập nhật state `course` với dữ liệu trả về
        setLoading(false); // Kết thúc tải dữ liệu
        console.log("Course Data:", response.data); // In ra console để kiểm tra dữ liệu trả về
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to fetch course details."); // Cập nhật state `error` nếu có lỗi
        setLoading(false);
      }
    };

    fetchCourseDetail(); // Gọi hàm lấy dữ liệu chi tiết khóa học khi component mount
  }, [id, token]); // Chạy lại effect mỗi khi id hoặc token thay đổi

  // Kiểm tra trạng thái nếu đang tải dữ liệu
  if (loading) return <div>Loading...</div>;

  // Nếu xảy ra lỗi khi lấy dữ liệu, hiển thị thông báo lỗi
  if (error) return <div>Error: {error}</div>;

  // Nếu không có dữ liệu khóa học, hiển thị thông báo
  if (!course) return <div>No course data available</div>;

  return (
    <DashboardLayout>
      {/* Tiêu đề khóa học */}
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      {/* Mô tả khóa học */}
      <p className="text-gray-600 mb-4">{course.description}</p>

      {/* Hiển thị các phần (sections) của khóa học */}
      {course.sections &&
        course.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-600 mb-4">{section.description}</p>

            {/* Hiển thị video nếu là phần miễn phí */}
            {section.is_free ? (
              <YouTubePlayer videoId={section.video_url} />
            ) : (
              <div className="bg-gray-200 p-4 text-center">
                <p className="text-lg font-bold">
                  This section is only available for premium users.
                </p>
              </div>
            )}

            {/* Hiển thị nội dung trong từng phần */}
            <div className="ml-4">
              {section.contents &&
                section.contents.map((content) => (
                  <div key={content.content_id} className="mb-4">
                    <h3 className="text-xl font-medium">{content.title}</h3>
                    <p className="text-gray-600">{content.description}</p>

                    {/* Hiển thị nội dung tùy theo loại */}
                    {content.content_type === "video" && (
                      <YouTubePlayer videoId={content.content_url} />
                    )}
                    {content.content_type === "document" && (
                      <a
                        href={content.content_url}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    )}
                    {content.content_type === "quiz" && (
                      <a
                        href={content.content_url}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Start Quiz
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

      <p className="text-gray-600">Price: ${course.price}</p>
      <p className="text-gray-600">Duration: {course.duration} hours</p>
      <p className="text-gray-600">Total Enrollments: {course.total_enrollments}</p>
      <p className="text-gray-600">Rating: {course.rating}</p>
    </DashboardLayout>
  );
}
