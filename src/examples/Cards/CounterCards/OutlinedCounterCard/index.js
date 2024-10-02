import CountUp from "react-countup";



// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function OutlinedCounterCard({ color = "info", count, title, prefix = "", suffix = "" }) {
  const { secondary } = colors;
  const { borderWidth } = borders;

  return (
    <SoftBox
      borderRadius="md"
      border={`${borderWidth[1]} dashed ${secondary.main}`}
      textAlign="center"
      py={2}
    >
      <SoftTypography variant="h6" color={color} fontWeight="medium" textTransform="capitalize">
        {title}
      </SoftTypography>
      <SoftTypography variant="h4" fontWeight="bold">
        {prefix && (
          <SoftTypography component="span" variant="h5" fontWeight="bold">
            {prefix}
          </SoftTypography>
        )}
        <SoftBox display="inline-block" mx={0.5}>
          <CountUp end={count} duration={1} separator="," />
        </SoftBox>
        {suffix && (
          <SoftTypography component="span" variant="h5" fontWeight="bold">
            {suffix}
          </SoftTypography>
        )}
      </SoftTypography>
    </SoftBox>
  );
}



export default OutlinedCounterCard;
