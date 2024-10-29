import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { fetchCourseTitleById } from "api/apiAdmin";

function Breadcrumbs({ icon, route, light = false }) {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const routes = route.slice(0, -1);

  useEffect(() => {
    const fetchTitle = async () => {
      if (id) {
        const courseTitle = await fetchCourseTitleById(id);
        setTitle(courseTitle || "Course");
      } else {
        const currentPath = location.pathname.split("/").pop();
        setTitle(currentPath.replace("-", " "));
      }
    };

    fetchTitle();
  }, [id, location.pathname]);

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
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
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
          {title ? title.replace("-", " ") : "Loading..."}
        </SoftTypography>
      </MuiBreadcrumbs>
      <SoftTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title ? title.replace("-", " ") : "Loading..."}
      </SoftTypography>
    </SoftBox>
  );
}

export default Breadcrumbs;
