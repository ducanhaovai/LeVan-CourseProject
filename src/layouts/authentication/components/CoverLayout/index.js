// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

function CoverLayout({
  color = "info",
  header = "",
  title = "",
  description = "",
  image,
  top = 20,
  children,
}) {
  // Render header content if provided, else render title and description
  const headerContent = header || (
    <>
      <SoftBox mb={1}>
        <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body2" fontWeight="regular" color="text">
        {description}
      </SoftTypography>
    </>
  );

  return (
    <PageLayout background="white">
      <Grid container justifyContent="center" sx={{ minHeight: "75vh", margin: 0 }}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SoftBox mt={top}>
            <SoftBox pt={3} px={3}>
              {headerContent}
            </SoftBox>
            <SoftBox p={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SoftBox
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            mr={-16}
            sx={{
              transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          >
            <SoftBox
              ml={-8}
              height="100%"
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                transform: "skewX(10deg)",
              }}
            />
          </SoftBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

export default CoverLayout;
