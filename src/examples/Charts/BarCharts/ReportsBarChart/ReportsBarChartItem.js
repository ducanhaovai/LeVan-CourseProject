
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

function ReportsBarChartItem({
  color = "dark", // Gán giá trị mặc định cho color
  icon,
  label,
  progress,
}) {
  const { size } = typography;

  return (
    <SoftBox width="100%">
      <SoftBox display="flex" alignItems="center" mb={2}>
        <SoftBox
          bgColor={icon.color}
          width="1.25rem"
          height="1.25rem"
          borderRadius="sm"
          color="white"
          fontSize={size.xs}
          display="flex"
          justifyContent="center"
          alignItems="center"
          shadow="md"
          mr={1}
          variant="gradient"
        >
          <Icon>{icon.component}</Icon>
        </SoftBox>
        <SoftTypography
          variant="caption"
          textTransform="capitalize"
          fontWeight="medium"
          color="text"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1}>
        <SoftTypography variant="h4" fontWeight="bold" color={color}>
          {progress.content}
        </SoftTypography>
        <SoftBox width="75%" mt={0.5}>
          <SoftProgress value={progress.percentage} color={color} />
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}



export default ReportsBarChartItem;
