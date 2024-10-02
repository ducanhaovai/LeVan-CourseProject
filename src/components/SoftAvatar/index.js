import { forwardRef } from "react";


// Custom styles for SoftAvatar
import SoftAvatarRoot from "components/SoftAvatar/SoftAvatarRoot";

const SoftAvatar = forwardRef(
  ({ bgColor = "transparent", size = "md", shadow = "none", ...rest }, ref) => (
    <SoftAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

// Typechecking props for the SoftAvatar

export default SoftAvatar;
