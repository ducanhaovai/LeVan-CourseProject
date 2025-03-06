import { jwtDecode } from "jwt-decode";
const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) {

    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {

      localStorage.removeItem("token");
      window.location.href = "/authentication/sign-in";
    } else {

    }
  } catch (error) {

    localStorage.removeItem("token");
    window.location.href = "/authentication/sign-in";
  }
};

// Chạy hàm khi tải trang
document.addEventListener("DOMContentLoaded", checkTokenExpiration);
export default checkTokenExpiration;
