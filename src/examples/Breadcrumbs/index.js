import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { fetchCourseTitleBySlug } from "api/apiAdmin";
function Breadcrumbs({ icon, route, light = false }) {
  const [title, setTitle] = useState("");
  const { slug } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchTitle = async () => {
      if (slug) {
        try {
          const courseData = await fetchCourseTitleBySlug(slug);
          setTitle(courseData.title || "Course");
        } catch (error) {
          console.error("Failed to fetch course title:", error);
          setTitle("Course");
        }
      } else {
        // If slug is not available, fallback to parsing the current path
        const currentPath = location.pathname.split("/").pop();
        setTitle(currentPath.replace("-", " "));
      }
    };

    fetchTitle();
  }, [slug, location.pathname]);

  const filteredRoutes = route.filter((el) => el !== slug && isNaN(Number(el)));

  return (
    <SoftBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <SoftTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </SoftTypography>
        </Link>
        {filteredRoutes.map((el, index) => (
          <Link to={`/${el}`} key={index}>
            <SoftTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el.replace("-", " ")}
            </SoftTypography>
          </Link>
        ))}
        <SoftTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title || "Loading..."}
        </SoftTypography>
      </MuiBreadcrumbs>
      <SoftTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title || "Loading..."}
      </SoftTypography>
    </SoftBox>
  );
}

export default Breadcrumbs;
