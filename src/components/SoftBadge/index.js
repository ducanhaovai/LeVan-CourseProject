import { forwardRef } from "react";


// Custom styles for the SoftBadge
import SoftBadgeRoot from "components/SoftBadge/SoftBadgeRoot";

const SoftBadge = forwardRef(
  (
    {
      color = "info",
      variant = "gradient",
      size = "sm",
      circular = false,
      indicator = false,
      border = false,
      container = false,
      children = null,
      ...rest
    },
    ref
  ) => (
    <SoftBadgeRoot
      {...rest}
      ownerState={{ color, variant, size, circular, indicator, border, container, children }}
      ref={ref}
      color="default"
    >
      {children}
    </SoftBadgeRoot>
  )
);



export default SoftBadge;
