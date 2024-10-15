import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL_AUTH;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, role } = response.data;

      if (accessToken && refreshToken) {
        // Save tokens in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Decode the access token to get role and other information
        const decoded = jwtDecode(accessToken);

        // Navigate to different dashboards based on role
        if (decoded.role === 1) {
          navigate("/dashboard");
        } else if (decoded.role === 2) {
          navigate("/instructor-dashboard");
        } else if (decoded.role === 3) {
          navigate("/theme");
        } else {
          navigate("/");
        }
      } else {
        setError("Login failed: No token received");
        setOpenSnackbar(true);
      }
    } catch (err) {
      // Handle different error scenarios
      if (err.response) {
        if (err.response.status === 401) {
          setError("Sai email hoặc mật khẩu. Vui lòng kiểm tra lại.");
        } else if (err.response.status === 404) {
          setError("Lỗi 404: Không tìm thấy tài nguyên. Vui lòng kiểm tra đường dẫn.");
        } else if (err.response.status === 400) {
          setError("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin đăng nhập.");
        } else {
          setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
      } else {
        setError("Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng.");
      }
      setOpenSnackbar(true);
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
          return;
        }

        if (decoded.role === 1) {
          navigate("/dashboard");
        } else if (decoded.role === 2) {
          navigate("/instructor-dashboard");
        } else if (decoded.role === 3) {
          navigate("/theme");
        }
      } catch (err) {
        setError("Token decoding failed:", err);
      }
    }
  }, [navigate]);
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit} noValidate>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="your@email.com"
            error={emailError}
            helpertext={emailErrorMessage}
            id="email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            error={passwordError}
            helpertext={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            color="info"
            type="submit"
            fullWidth
            onClick={validateInputs}
          >
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%", fontSize: "1.25rem" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </CoverLayout>
  );
}

export default SignIn;
