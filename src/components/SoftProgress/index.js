import { forwardRef } from "react";



// Soft UI Dashboard React components
import SoftTypography from "components/SoftTypography";

// Custom styles for SoftProgress
import SoftProgressRoot from "components/SoftProgress/SoftProgressRoot";

const SoftProgress = forwardRef(
  ({ variant = "contained", color = "info", value = 0, label = false, ...rest }, ref) => (
    <>
      {label && (
        <SoftTypography variant="button" fontWeight="medium" color="text">
          {value}%
        </SoftTypography>
      )}
      <SoftProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        ownerState={{ color, value, variant }}
      />
    </>
  )
);



export default SoftProgress;
