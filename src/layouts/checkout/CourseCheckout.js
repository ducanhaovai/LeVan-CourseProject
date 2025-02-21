"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Card, CardContent } from "./components/card";
import { Button } from "./components/button";
import {
  getCourseDetails,
  createOrGetPaymentReference,
  cancelPayment,
  confirmPayment,
} from "../../api/apiAdmin";

export default function CourseCheckoutManual() {
  const [course, setCourse] = useState(null);
  const [paymentRefCode, setPaymentRefCode] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const currentUser = useMemo(() => (token ? jwtDecode(token) : null), [token]);

  // Ref để theo dõi trạng thái xác nhận payment
  const isConfirmedRef = useRef(isPaymentConfirmed);
  useEffect(() => {
    isConfirmedRef.current = isPaymentConfirmed;
  }, [isPaymentConfirmed]);

  // Effect: fetch course data (chỉ chạy khi slug thay đổi)
  useEffect(() => {
    async function fetchCourse() {
      if (!slug) {
        setError("Slug không được cung cấp");
        setLoading(false);
        return;
      }
      const courseData = await getCourseDetails(slug);
      if (!courseData?.data) {
        setError("Không tìm thấy khóa học");
        setLoading(false);
        return;
      }
      console.log("Course data received:", courseData.data);
      setCourse(courseData.data);
      setLoading(false);
    }
    fetchCourse();
  }, [slug]);

  // Effect: tạo payment khi course data đã có và payment chưa được tạo
  useEffect(() => {
    async function createPayment() {
      if (!course) return;
      if (paymentId) return; // đã có payment, không cần tạo lại
      const user_id = currentUser?.id;
      const course_id = course.id;
      const amount = course.price;
      if (!user_id || !course_id || !amount) {
        setError("Thiếu thông tin user hoặc course");
        return;
      }
      const paymentResponse = await createOrGetPaymentReference({ user_id, course_id, amount, token });
      if (paymentResponse?.success) {
        console.log("Payment response received:", paymentResponse.payment);
        setPaymentRefCode(paymentResponse.payment.reference_code);
        setPaymentId(paymentResponse.payment.id);
      } else {
        setError("Không thể tạo payment");
      }
    }
    createPayment();
  }, [course, currentUser, token, paymentId]);

  // Effect: tự động xóa payment khi mã xác nhận hết hạn (10 phút)
  // hoặc khi người dùng chuyển trang nếu payment chưa được xác nhận
  useEffect(() => {
    if (!paymentId) return;

    console.log("Setting up auto-cancel timer for payment:", paymentId);
    const timer = setTimeout(() => {
      if (!isConfirmedRef.current) {
        console.log("Auto-cancel timer triggered for payment:", paymentId);
        cancelPayment({ paymentId, token });
      }
    }, 600000); // 600000ms = 10 phút

    const handleBeforeUnload = () => {
      if (!isConfirmedRef.current) {
        console.log("Before unload - cancelling payment:", paymentId);
        cancelPayment({ paymentId, token });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (!isConfirmedRef.current) {
        console.log("Component unmount - cancelling payment:", paymentId);
        cancelPayment({ paymentId, token });
      }
    };
  }, [paymentId, token]);

  // Hàm xử lý khi người dùng nhấn "Đã chuyển tiền"
  const handleConfirmTransfer = useCallback(async () => {
    if (!paymentId) return;
    console.log("User confirmed transfer for payment:", paymentId);
    const result = await confirmPayment({ paymentId, token });
    if (result?.success) {
      setIsPaymentConfirmed(true);
      console.log("Payment confirmed successfully for:", paymentId);
      alert("Xác nhận chuyển tiền thành công. Hệ thống sẽ kiểm tra giao dịch của bạn.");
    } else {
      console.error("Error confirming payment for:", paymentId);
      alert("Có lỗi trong quá trình xác nhận, vui lòng thử lại sau.");
    }
  }, [paymentId, token]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">Error: {error}</div>;
  if (!course) return <div className="text-center mt-8">No course data available</div>;

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Thanh Toán Thủ Công</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Phần hiển thị mã xác nhận và hướng dẫn chuyển khoản */}
          <div className="lg:w-2/3 flex flex-col items-center">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center p-8">
                {/* (Nếu cần) Hiển thị QR Code */}
                <div className="bg-gray-200 border border-gray-300 w-64 h-64 flex items-center justify-center">
                  <span className="text-gray-700 font-semibold">QR Code (Nếu cần)</span>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-800">
                    Vui lòng chuyển khoản và <strong>ghi chú</strong> mã xác nhận bên dưới trong phần “Nội dung thanh toán” để chúng tôi có thể xác minh.
                  </p>
                </div>
                {/* Hiển thị mã xác nhận */}
                <div className="mt-6 text-center">
                  <p className="font-semibold text-lg">Mã xác nhận của bạn:</p>
                  <p className="bg-gray-100 border rounded px-4 py-2 mt-2 text-xl text-blue-600">
                    {paymentRefCode || "Đang tạo mã..."}
                  </p>
                </div>
                {/* Nút xác nhận chuyển tiền (chỉ hiển thị nếu payment chưa được xác nhận) */}
                {!isPaymentConfirmed && (
                  <div className="mt-6">
                    <Button onClick={handleConfirmTransfer}>Đã chuyển tiền</Button>
                  </div>
                )}
                {isPaymentConfirmed && (
                  <div className="mt-6 text-green-600 font-semibold">
                    Giao dịch của bạn đang được xử lý.
                  </div>
                )}
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Sau khi chuyển khoản, vui lòng đợi chúng tôi kiểm tra giao dịch. Bạn sẽ nhận được thông báo khi thanh toán được xác nhận.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Phần tóm tắt đơn hàng */}
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={course.thumbnail} alt="Thumbnail" className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-600">{course.price}$</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Giá gốc:</span>
                    <span>{course.price}$</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Tổng:</span>
                    <span>{course.price}$</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Bằng việc hoàn thành thanh toán, bạn đồng ý với các Điều khoản Dịch vụ.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
