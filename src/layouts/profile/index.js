import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import { jwtDecode } from "jwt-decode";
import { fetchUsersByID } from "api/apiAdmin";

import Header from "./components/Header";
import { fetchAllUserEnrolledCourses } from "api/apiEnrollments";

function Overview() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const getRoleName = (role) => {
    const roles = {
      1: "Admin",
      3: "User",
    };
    return roles[role] || "Unknown";
  };

  const getStatusName = (status) => {
    const statuses = {
      1: "Active",
      2: "Deactive",
    };
    return statuses[status] || "Unknown";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetchAllUserEnrolledCourses(token)
      .then((data) => {
        const relevantEnrollments = data[0];
        console.log("Fetched and flattened enrollments:", relevantEnrollments);
        setEnrollments(relevantEnrollments);
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  }, []);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await fetchUsersByID(userId, token);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <SoftBox py={3} display="flex" justifyContent="center">
          <SoftTypography variant="h5">Loading user information...</SoftTypography>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header
        first_name={userInfo.first_name || ""}
        last_name={userInfo.last_name || ""}
        userTitle={getRoleName(userInfo.role)}
      />
      <SoftBox mt={5} mb={3}>
        {/* Info user */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={4}>
            {userInfo && (
              <ProfileInfoCard
                title="Profile Information"
                description="Welcome to your profile overview. Here, you can manage your personal information and social links."
                info={{
                  fullName:
                    `${userInfo.first_name || ""} ${userInfo.last_name || ""}`.trim() || "N/A",
                  username: userInfo.username || "N/A",
                  email: userInfo.email || "N/A",
                  status: getStatusName(userInfo.status),
                  role: getRoleName(userInfo.role),
                }}
                social={[
                  {
                    link: "https://www.facebook.com/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "/edit-profile", tooltip: "Edit Profile" }}
              />
            )}
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="Conversations" />
          </Grid>
        </Grid>
      </SoftBox>
      {/* Course enrollment */}
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Projects
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {enrollments.length > 0 ? (
                enrollments.map((enrollment, index) => (
                  <Grid item xs={12} md={6} xl={3} key={index}>
                    <DefaultProjectCard
                      image={enrollment.thumbnail || "defaultCourseImage.jpg"}
                      label={`Course #${index + 1}`}
                      title={enrollment.title}
                      description={enrollment.description}
                      action={{
                        type: "internal",
                        route: `/courses/${enrollment.slug}`,
                        color: "info",
                        label: "view course",
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <SoftTypography>You are not enrolled in any courses.</SoftTypography>
                </Grid>
              )}
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
