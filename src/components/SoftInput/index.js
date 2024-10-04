import { forwardRef } from "react";



// Custom styles for SoftInput
import SoftInputRoot from "components/SoftInput/SoftInputRoot";
import SoftInputWithIconRoot from "components/SoftInput/SoftInputWithIconRoot";
import SoftInputIconBoxRoot from "components/SoftInput/SoftInputIconBoxRoot";
import SoftInputIconRoot from "components/SoftInput/SoftInputIconRoot";

// Soft UI Dashboard React contexts
import { useSoftUIController } from "context";

const SoftInput = forwardRef(
  (
    {
      size = "medium",
      icon = { component: false, direction: "none" },
      error = false,
      success = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    let template;
    const [controller] = useSoftUIController();
    const { direction } = controller;
    const iconDirection = icon.direction;

    if (icon.component && icon.direction === "left") {
      template = (
        <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
          <SoftInputIconBoxRoot ownerState={{ size }}>
            <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
              {icon.component}
            </SoftInputIconRoot>
          </SoftInputIconBoxRoot>
          <SoftInputRoot
            {...rest}
            ownerState={{ size, error, success, iconDirection, direction, disabled }}
          />
        </SoftInputWithIconRoot>
      );
    } else if (icon.component && icon.direction === "right") {
      template = (
        <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
          <SoftInputRoot
            {...rest}
            ownerState={{ size, error, success, iconDirection, direction, disabled }}
          />
          <SoftInputIconBoxRoot ownerState={{ size }}>
            <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
              {icon.component}
            </SoftInputIconRoot>
          </SoftInputIconBoxRoot>
        </SoftInputWithIconRoot>
      );
    } else {
      template = (
        <SoftInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />
      );
    }

    return template;
  }
);



export default SoftInput;