import { forwardRef } from "react";



// Custom styles for SoftButton
import SoftButtonRoot from "components/SoftButton/SoftButtonRoot";

const SoftButton = forwardRef(
  (
    {
      size = "medium",
      variant = "contained",
      color = "white",
      circular = false,
      iconOnly = false,
      children,
      ...rest
    },
    ref
  ) => (
    <SoftButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </SoftButtonRoot>
  )
);



export default SoftButton;
