import { forwardRef } from "react";



// Custom styles for SoftTypography
import SoftTypographyRoot from "components/SoftTypography/SoftTypographyRoot";

const SoftTypography = forwardRef(
  (
    {
      color = "dark",
      fontWeight = false,
      textTransform = "none",
      verticalAlign = "unset",
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => (
    <SoftTypographyRoot
      {...rest}
      ref={ref}
      ownerState={{ color, textTransform, verticalAlign, fontWeight, opacity, textGradient }}
    >
      {children}
    </SoftTypographyRoot>
  )
);



export default SoftTypography;
