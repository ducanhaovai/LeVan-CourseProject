import React, { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useNavigate, Link } from "react-router-dom"

import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import SoftBox from "components/SoftBox"
import SoftTypography from "components/SoftTypography"
import SoftInput from "components/SoftInput"
import SoftButton from "components/SoftButton"

import BasicLayout from "layouts/authentication/components/BasicLayout"
import Socials from "layouts/authentication/components/Socials"
import Separator from "layouts/authentication/components/Separator"

import curved6 from "assets/images/curved-images/curved14.jpg"
const API_URL = process.env.REACT_APP_API_URL_AUTH

function SignUp() {
  const [agreement, setAgreement] = useState(true)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.role) {
          switch (decoded.role) {
            case 1:
              navigate("/dashboard")
              break
            case 2:
              navigate("/instructor-dashboard")
              break
            case 3:
              navigate("/student-dashboard")
              break
            default:
              navigate("/")
              break
          }
        }
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
  }, [navigate])

  const validate = () => {
    const tempErrors = {};
    tempErrors.first_name = formData.first_name.trim() ? "" : "First name is required.";
    tempErrors.last_name = formData.last_name.trim() ? "" : "Last name is required.";
    tempErrors.username = formData.username.trim() ? "" : "Username is required.";
    if (!tempErrors.username) {
      tempErrors.username = /^[a-zA-Z0-9_]{3,20}$/.test(formData.username)
        ? ""
        : "Username must be 3-20 characters long and can only contain letters, numbers, and underscores.";
    }
    tempErrors.email = /^\S+@\S+\.\S+$/.test(formData.email) ? "" : "Email is not valid.";
    tempErrors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
    if (!tempErrors.password) {
      tempErrors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
        ? ""
        : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    tempErrors.confirmPassword = formData.confirmPassword === formData.password ? "" : "Passwords do not match.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Perform validation on each change
    const tempErrors = { ...errors };
    switch (name) {
      case "first_name":
        tempErrors.first_name = value.trim() ? "" : "First name is required.";
        break;
      case "last_name":
        tempErrors.last_name = value.trim() ? "" : "Last name is required.";
        break;
      case "username":
        tempErrors.username = value.trim() ? "" : "Username is required.";
        if (!tempErrors.username) {
          tempErrors.username = /^[a-zA-Z0-9_]{3,20}$/.test(value)
            ? ""
            : "Username must be 3-20 characters long and can only contain letters, numbers, and underscores.";
        }
        break;
      case "email":
        tempErrors.email = /^\S+@\S+\.\S+$/.test(value) ? "" : "Email is not valid.";
        break;
      case "password":
        tempErrors.password = value.length >= 8 ? "" : "Password must be at least 8 characters long.";
        if (!tempErrors.password) {
          tempErrors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            ? ""
            : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
        tempErrors.confirmPassword = formData.confirmPassword === value ? "" : "Passwords do not match.";
        break;
      case "confirmPassword":
        tempErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match.";
        break;
      default:
        break;
    }
    setErrors(tempErrors);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      try {
        const response = await axios.post(`${API_URL}/register`, formData);
        setSnackbarMessage("Registration successful! Redirecting to sign in...")
        setSnackbarSeverity("success")
        setOpenSnackbar(true)
        setTimeout(() => {
          navigate("/authentication/sign-in")
        }, 2000)
      } catch (error) {
        setSnackbarMessage("Registration failed. Please try again.")
        setSnackbarSeverity("error")
        setOpenSnackbar(true)
        setErrors((prev) => ({ ...prev, formError: "Registration failed. Please try again." }))
      }
    } else {
      const firstErrorKey = Object.keys(errors).find(key => errors[key] !== "");
      const firstErrorMessage = errors[firstErrorKey] || "Please check your input.";
      setSnackbarMessage(firstErrorMessage);
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit} noValidate>
            {Object.keys(formData).map((key) => (
              <SoftBox mb={2} key={key}>
                <SoftInput
                  type={key.includes("password") ? "password" : "text"}
                  placeholder={key
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={Boolean(errors[key])}

                  inputProps={{
                    autoComplete: key === "confirmPassword" ? "new-password" : "on",
                  }}
                />
              </SoftBox>
            ))}
            {errors.formError && <Typography color="error">{errors.formError}</Typography>}
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={() => setAgreement(!agreement)} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={() => setAgreement(!agreement)}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit" disabled={!agreement}>
                Sign Up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </BasicLayout>
  )
}

export default SignUp

