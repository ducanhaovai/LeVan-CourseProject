// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Soft UI Dashboard React page layout routes
import pageRoutes from "page.routes";

// Images
import pattern from "assets/images/shapes/pattern-lines.svg";

function IllustrationLayout({
  color = "info",
  header = "",
  title = "",
  description = "",
  illustration = {},
  children,
}) {
  // Render phần illustration nếu có thông tin hình ảnh, tiêu đề hoặc mô tả
  const illustrationContent =
    illustration.image || illustration.title || illustration.description ? (
      <SoftBox
        display={{ xs: "none", lg: "flex" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="calc(100% - 2rem)"
        height="calc(100vh - 2rem)"
        position="relative"
        borderRadius="lg"
        textAlign="center"
        bgColor={color}
        variant="gradient"
        m={2}
        px={13}
        sx={{ overflow: "hidden" }}
      >
        <SoftBox
          component="img"
          src={pattern}
          alt="pattern-lines"
          width="120rem"
          position="absolute"
          top={0}
          left={0}
          opacity={0.4}
        />
        {illustration.image && (
          <SoftBox
            component="img"
            src={illustration.image}
            alt="chat-illustration"
            width="100%"
            maxWidth="31.25rem"
          />
        )}
        {illustration.title && (
          <SoftBox mt={6} mb={1}>
            <SoftTypography variant="h4" color="white" fontWeight="bold">
              {illustration.title}
            </SoftTypography>
          </SoftBox>
        )}
        {illustration.description && (
          <SoftBox mb={1}>
            <SoftTypography variant="body2" color="white">
              {illustration.description}
            </SoftTypography>
          </SoftBox>
        )}
      </SoftBox>
    ) : null;

  return (
    <PageLayout background="white">
      <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-pro-react",
          label: "buy now",
        }}
      />
      <Grid container>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <SoftBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <SoftBox pt={3} px={3}>
              {header ? (
                header
              ) : (
                <>
                  <SoftBox mb={1}>
                    <SoftTypography variant="h4" fontWeight="bold">
                      {title}
                    </SoftTypography>
                  </SoftBox>
                  <SoftTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </SoftTypography>
                </>
              )}
            </SoftBox>
            <SoftBox p={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          {illustrationContent}
        </Grid>
      </Grid>
    </PageLayout>
  );
}



export default IllustrationLayout;
