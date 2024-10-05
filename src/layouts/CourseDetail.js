import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy id từ URL
import axios from "axios";
import YouTubePlayer from "./YouTubePlayer";

export default function CourseDetail() {
  const { id } = useParams(); // Lấy id từ URL (nếu đang dùng react-router)
  const [course, setCourse] = useState(null); // State để lưu trữ dữ liệu khóa học
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  const token = localStorage.getItem("token"); // Lấy token từ localStorage (nếu cần xác thực)

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // Gửi request đến API backend của bạn để lấy thông tin khóa học với id=13
        const response = await axios.get(`http://localhost:3001/courses/15`, {
          headers: {
            Authorization: `Bearer ${token}`, // Nếu API yêu cầu xác thực, thêm header này
          },
        });

        // Cập nhật state `course` với dữ liệu trả về từ API
        setCourse(response.data);
        console.log("Course Data:", response.data); // Log dữ liệu để kiểm tra
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to fetch course details."); // Cập nhật state `error` nếu có lỗi
      }
    };

    fetchCourseDetail(); // Gọi hàm fetchCourseDetail để lấy dữ liệu
  }, [token]); // Chạy lại mỗi khi `token` thay đổi

  // Hiển thị thông báo lỗi nếu có
  if (error) return <div>Error: {error}</div>;

  // Hiển thị thông báo Loading nếu dữ liệu chưa tải xong
  if (!course) return <div>Loading...</div>;

  // Nếu dữ liệu đã được tải, hiển thị chi tiết khóa học
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      <YouTubePlayer videoId={course.video_id} />

      <p className="text-gray-600">Price: ${course.price}</p>
      <p className="text-gray-600">Duration: {course.duration} hours</p>
      <p className="text-gray-600">Total Enrollments: {course.total_enrollments}</p>
      <p className="text-gray-600">Rating: {course.rating}</p>
    </div>
  );
}
