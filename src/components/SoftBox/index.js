import { forwardRef } from "react";
/* eslint-disable react/prop-types */

// Custom styles for SoftBox
import SoftBoxRoot from "components/SoftBox/SoftBoxRoot";

const SoftBox = forwardRef(
  (
    {
      variant = "contained",
      bgColor = "transparent",
      color = "dark",
      opacity = 1,
      borderRadius = "none",
      shadow = "none",
      ...rest
    },
    ref
  ) => (
    <SoftBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow }}
      
    />
  )
);

export default SoftBox;
