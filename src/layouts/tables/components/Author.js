
import React from "react";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";

const Author = ({ user }) => {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar alt={user.username} size="sm" variant="rounded">
          {user.first_name[0] + user.last_name[0]}
        </SoftAvatar>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="bold" color="black">
          {user.first_name} {user.last_name}
        </SoftTypography>
        <SoftTypography variant="caption" color="black">
          {user.email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
};

export default Author;
