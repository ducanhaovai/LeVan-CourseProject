import { useState } from "react";


// @mui material components
import Fade from "@mui/material/Fade";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Custom styles for the SoftAlert
import SoftAlertRoot from "components/SoftAlert/SoftAlertRoot";
import SoftAlertCloseIcon from "components/SoftAlert/SoftAlertCloseIcon";

function SoftAlert({ color = "info", dismissible = false, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <SoftAlertRoot ownerState={{ color }} {...rest}>
        <SoftBox display="flex" alignItems="center" color="white">
          {children}
        </SoftBox>
        {dismissible ? (
          <SoftAlertCloseIcon onClick={mount ? handleAlertStatus : null}>
            &times;
          </SoftAlertCloseIcon>
        ) : null}
      </SoftAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Typechecking props of the SoftAlert


export default SoftAlert;
