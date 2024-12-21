import { forwardRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { menuItem, menuImage } from "examples/Items/NotificationItem/styles";

const NotificationItem = forwardRef(
  ({ color = "dark", image, title, date, isRead, ...rest }, ref) => (
    <MenuItem
      {...rest}
      ref={ref}
      sx={(theme) => ({
        ...menuItem(theme),
        backgroundColor: !isRead ? theme.palette.action.hover : "inherit", // Đổi nền nếu chưa đọc
      })}
    >
      <SoftBox
        width="2.25rem"
        height="2.25rem"
        mt={0.25}
        mr={2}
        mb={0.25}
        borderRadius="lg"
        sx={(theme) => menuImage(theme, { color })}
      >
        {image}
      </SoftBox>

      <SoftBox>
        <SoftTypography variant="button" fontWeight="regular">
          {title}
        </SoftTypography>

        <SoftTypography
          variant="caption"
          color="secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <Icon
            sx={{
              lineHeight: 1.2,
              mr: 0.5,
            }}
          >
            watch_later
          </Icon>
          {date}
        </SoftTypography>
      </SoftBox>
    </MenuItem>
  )
);

export default NotificationItem;
