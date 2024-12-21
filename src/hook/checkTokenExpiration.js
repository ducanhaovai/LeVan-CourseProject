import { jwtDecode } from "jwt-decode";
const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Không có token.");
    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Đơn vị là giây

    if (decodedToken.exp < currentTime) {
      console.log("Token đã hết hạn.");
      localStorage.removeItem("token");
      window.location.href = "/authentication/sign-in";
    } else {
      console.log("Token còn hợp lệ.");
    }
  } catch (error) {
    console.log("Token không hợp lệ:", error);
    localStorage.removeItem("token");
    window.location.href = "/authentication/sign-in";
  }
};

// Chạy hàm khi tải trang
document.addEventListener("DOMContentLoaded", checkTokenExpiration);
export default checkTokenExpiration;
