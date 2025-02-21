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
import axiosInstance from "hook/AxiosInterceptor";
import usePrevent from "hook/PreventHandler";

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
  usePrevent();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { accessToken } = response.data;

      if (accessToken) {

        localStorage.setItem("token", accessToken);

        try {
          const decoded = jwtDecode(accessToken);

          if (decoded.exp) {
            const currentTime = Date.now() / 1000;


            if (decoded.exp < currentTime) {
              console.error("Token expired after login.");
              setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
              setOpenSnackbar(true);
              localStorage.removeItem("token");
              return;
            }
          }

          switch (decoded.role) {
            case 1:
              navigate("/home");
              break;
            case 2:
              navigate("/home");
              break;
            case 3:
              navigate("/home");
              break;
            default:
              navigate("/");
          }
        } catch (decodeError) {
          console.error("Token decoding failed:", decodeError);
          setError("Không thể giải mã token.");
          setOpenSnackbar(true);
        }
      } else {
        setError("Không nhận được token từ máy chủ.");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Sai email hoặc mật khẩu.");
            break;
          case 404:
            setError("Không tìm thấy tài nguyên.");
            break;
          case 400:
            setError("Yêu cầu không hợp lệ.");
            break;
          default:
            setError("Đã xảy ra lỗi không xác định.");
        }
      } else {
        setError("Không thể kết nối với máy chủ.");
      }
      setOpenSnackbar(true);
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
          console.error("Token expired on load.");
          localStorage.removeItem("token");
          setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
          return;
        }

        switch (decoded.role) {
          case 1:
            navigate("/home");
            break;
          case 2:
            navigate("/instructor-dashboard");
            break;
          case 3:
            navigate("/home");
            break;
          default:
            navigate("/");
        }
      } catch (decodeError) {
        console.error("Token decoding failed on load:", decodeError);
        setError("Không thể giải mã token.");
      }
    }
  }, [navigate]);
  const handleSignUpClick = () => {
    navigate("/authentication/sign-up");
  };
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
              component="span"
              onClick={handleSignUpClick}
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{ cursor: 'pointer' }}
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
