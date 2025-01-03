// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Timeline context
import { TimelineProvider } from "examples/Timeline/context";

function TimelineList({ title, dark = false, children }) {
  return (
    <TimelineProvider value={dark}>
      <Card>
        <SoftBox bgColor={dark ? "dark" : "white"} variant="gradient">
          <SoftBox pt={3} px={3}>
            <SoftTypography variant="h6" fontWeight="medium" color={dark ? "white" : "dark"}>
              {title}
            </SoftTypography>
          </SoftBox>
          <SoftBox p={2}>{children}</SoftBox>
        </SoftBox>
      </Card>
    </TimelineProvider>
  );
}



export default TimelineList;
